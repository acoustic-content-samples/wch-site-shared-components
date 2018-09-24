/*******************************************************************************
 * Copyright IBM Corp. 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  DEP_TYPE,
  findPackageJson,
  findSdkVersion,
  rxTransformJsonFile,
  updateMinVersion
} from '@ibm-wch-sdk/schematics-utils';
import { assertArray, assertObject, isNotNil } from '@ibm-wch-sdk/utils';
import { combineLatest, of } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { coerce } from 'semver';

import { Schema } from './schema';

export const PACKAGE_PATH = '/package.json';

export const FONT_AWESOME = 'font-awesome';

const WCHTOOLS_DEPENDENCIES = 'wchtools-dependencies';

// function _addToWchToolsDependencies(aDeps: string[], aPkg: any) {
//   // add the key
//   const deps = assertArray(WCHTOOLS_DEPENDENCIES, aPkg);
//   // filter
//   deps.push(...aDeps.filter(dep => !deps.includes(dep)));
// }

function _updatePackage(
  aDstPkg: any,
  aSrcPkg: any,
  aSdkVersion: string,
  aOptions: Schema
): any {
  // prepare the structures
  const deps = assertObject<any>('dependencies', aDstPkg);

  // add to the dependencies
  const name = aSrcPkg.name;

  // update the package version
  updateMinVersion(name, aSrcPkg.version, aDstPkg, DEP_TYPE.RUNTIME);

  // check the version of web animations
  const fontAwesome = aSrcPkg.devDependencies[FONT_AWESOME];
  if (isNotNil(fontAwesome)) {
    // update
    const ver = coerce(fontAwesome);
    if (ver) {
      // update the version
      updateMinVersion(FONT_AWESOME, ver.version, aDstPkg, DEP_TYPE.RUNTIME);
    }
  }

  // check the SDK version
  if (!!aOptions.editable) {
    // parse the SDK
    const sdkVersion = coerce(aSdkVersion)!.version;
    // make sure we depend on the edit lib
    updateMinVersion(
      '@ibm-wch-sdk/ng-edit',
      sdkVersion,
      aDstPkg,
      DEP_TYPE.RUNTIME
    );
  }

  // add this dependency
  // _addToWchToolsDependencies([aSrcPkg.name], aDstPkg);

  return aDstPkg;
}

export function updatePackage(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    // load
    const rxPkg = findPackageJson(__dirname);
    const rxSdk = findSdkVersion(host);

    return combineLatest(rxPkg, rxSdk).pipe(
      switchMap(([pkg, sdkVersion]) =>
        rxTransformJsonFile(
          PACKAGE_PATH,
          (aBuild: any) =>
            of(_updatePackage(aBuild || {}, pkg, sdkVersion, options)),
          host
        )
      ),
      mapTo(host)
    );
  };
}
