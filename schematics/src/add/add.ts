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
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getWorkspace } from '@ibm-wch-sdk/schematics-utils';
import { Schema } from './schema';
import { updateAppModule } from './update.app.module';
import { updatePackage } from './update.package';
import { updateAngularJson } from './update.angular.json';
import { addWCHontentArtifaces } from './add.content.artifacts';


export function addComponents(options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    if (!options.project) {
      throw new SchematicsException('Option "project" is required.');
    }
    const project = workspace.projects[options.project];
    if (project.projectType !== 'application') {
      throw new SchematicsException('Project must be of type "application".');
    }


    // add the install task
    context.addTask(new NodePackageInstallTask());

    return chain([
        updatePackage(options),
        updateAppModule(options, project),
        updateAngularJson(options),
        addWCHontentArtifaces(options)
    ])(host, context);
  };
}
