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
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import {
  getWorkspacePath,
  rxTransformJsonFile,
  WorkspaceSchema
} from '@ibm-wch-sdk/schematics-utils';
import { isNil } from '@ibm-wch-sdk/utils';
import { of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { Schema } from './schema';

const FONT_AWESOME_IMPORT = './node_modules/font-awesome/css/font-awesome.css';

function _updateWorkspace(
  aWorkspace: WorkspaceSchema,
  aOptions: Schema
): WorkspaceSchema {
  // the project name
  const project = aOptions.project;
  if (!isNil(project)) {
    // access the config
    const prj = aWorkspace.projects[project];
    if (!isNil(prj)) {
      // access the config
      const styles: string[] = prj.architect!.build.options.styles;
      // update the style
      if (styles.indexOf(FONT_AWESOME_IMPORT) < 0) {
        // include the import
        styles.push(FONT_AWESOME_IMPORT);
      }
    }
  }
  // return the workspace
  return aWorkspace;
}

export function updateAngularJson(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    // access the workspace
    const workspacePath = getWorkspacePath(host);
    if (isNil(workspacePath)) {
      // error
      throw new SchematicsException('Workspace not found.');
    }
    if (!options.project) {
      throw new SchematicsException('Option "project" is required.');
    }
    // load the workspace
    return rxTransformJsonFile(
      workspacePath,
      (aConfig: any, aPath?: string) =>
        of(_updateWorkspace(aConfig as WorkspaceSchema, options)),
      host
    ).pipe(mapTo(host));
  };
}
