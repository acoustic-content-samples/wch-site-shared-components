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
  VirtualTree,
  Tree
} from '@angular-devkit/schematics';

import { Schema } from './schema';
import { updateAppModule } from './update.app.module';
import {
  WorkspaceProject,
  getSourceFile,
  isImported
} from '@ibm-wch-sdk/schematics-utils';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Path } from '@angular-devkit/core';
import { createSourceFile } from 'typescript';

const APP_MODULE_PATH = '/schematics/app/app.module.ts' as Path;
const MAIN_PATH = '/schematics/main.ts' as Path;

const DEFAULT_MAIN = `
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
`;

const DEFAULT_APP_MODULE = `
import { BrowserModule } from '@angular/platform-browser';
import { WchNgModule } from '@ibm-wch-sdk/ng';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WchNgModule.forRoot(environment)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

const APP_MODULE_WITH_IMPORTS = `
import { BrowserModule } from '@angular/platform-browser';
import { WchNgModule } from '@ibm-wch-sdk/ng';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WchNgEditModule } from '@ibm-wch-sdk/ng-edit';
import { SPASharedComponentModule } from '@ibm-wch/components-ng-shared-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WchNgModule.forRoot(environment),
    BrowserAnimationsModule,
    WchNgEditModule.forRoot(),
    SPASharedComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`;

describe('update.app.module', () => {
  const context: SchematicContext = ({
    engine: null,
    debug: false,
    strategy: MergeStrategy.Default
  } as {}) as SchematicContext;

  function _verifyAppModule(aTree: Tree) {
    // load the file
    const source = getSourceFile(aTree, APP_MODULE_PATH);

    // check the imports
    expect(
      isImported(
        source,
        'SPASharedComponentModule',
        '@ibm-wch/components-ng-shared-components'
      )
    ).toBeTruthy();

  }

  function _testAddToAppModule(aAppModule: string) {
    const tree = new VirtualTree();

    const options: Schema = {
      project: 'abc',
      editable: true
    };

    const project: WorkspaceProject = {
      root: '',
      prefix: 'app',
      projectType: 'application',
      architect: {
        build: {
          options: {
            main: 'schematics/main.ts'
          }
        }
      }
    };

    tree.create(MAIN_PATH, DEFAULT_MAIN);
    tree.create(APP_MODULE_PATH, aAppModule);

    const rxResult = updateAppModule(options, project)(
      tree,
      context
    ) as Observable<Tree>;

    return rxResult
      .pipe(
        tap(tree => {
          const buf = tree.read(APP_MODULE_PATH);
          expect(!!buf).toBeTruthy();
          _verifyAppModule(tree);
        })
      )
      .toPromise();
  }

  it('should add to the app module', () => {
    return _testAddToAppModule(DEFAULT_APP_MODULE);
  });

  it('should be idempotent', () => {
    return _testAddToAppModule(APP_MODULE_WITH_IMPORTS);
  });
});
