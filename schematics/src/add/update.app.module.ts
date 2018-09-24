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
import { Path } from '@angular-devkit/core';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  addImportToModule,
  changeSourceFile,
  findPackageJson,
  getAppModulePath,
  WorkspaceProject
} from '@ibm-wch-sdk/schematics-utils';
import { map } from 'rxjs/operators';

import { Schema } from './schema';

export function updateAppModule(
  options: Schema,
  project: WorkspaceProject
): Rule {
  return (host: Tree, context: SchematicContext) => {
    const mainPath = project.architect!.build.options.main;
    const appModulePath = getAppModulePath(host, mainPath) as Path;

    // find package json
    const rxPkg = findPackageJson(__dirname);

    return rxPkg.pipe(
      map(pkg => {
        // optionally add the edit module
        if (!!options.editable) {
          // add edit module
          changeSourceFile(
            appModulePath,
            (path, source) =>
              addImportToModule(
                source,
                path,
                'WchNgEditModule.forRoot()',
                '@ibm-wch-sdk/ng-edit'
              ),
            host
          );
        }

        // add component module
        changeSourceFile(
          appModulePath,
          (path, source) =>
            addImportToModule(source, path, 'SPASharedComponentModule', pkg.name),
          host
        );

        return host;
      })
    );
  };
}
