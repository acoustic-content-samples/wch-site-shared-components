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
import {
  MergeStrategy,
  SchematicContext,
  VirtualTree
} from '@angular-devkit/schematics';
import { isObservable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Schema } from './schema';
import { PACKAGE_PATH, updatePackage } from './update.package';

describe('update.package', () => {
  const context: SchematicContext = ({
    engine: null,
    debug: false,
    strategy: MergeStrategy.Default
  } as {}) as SchematicContext;


  it('should update an existing package json', () => {
    const tree = new VirtualTree();

    const options: Schema = {
      project: 'abc',
      editable: true
    };

    const pkg: any = {};

    tree.create(PACKAGE_PATH, JSON.stringify(pkg));

    const res = updatePackage(options)(tree, context);

    const rxRes = isObservable(res) ? res : of(res);

    return rxRes
      .pipe(
        tap(tree => {
          // verify the url
          expect(tree).toBeTruthy();
          if (tree) {
            // check that we have the file
            expect(tree.exists(PACKAGE_PATH)).toBeTruthy();

            // read
            const pkg = JSON.parse(tree.read(PACKAGE_PATH)!.toString());

            expect(
              pkg.dependencies['@ibm-wch/components-ng-shared-components']
            ).toBeTruthy();

          }
        })
      )
      .toPromise();
  });
});
