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
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewAllComponent } from './view-all.component';

describe('ViewAllComponent', () => {
	let component: ViewAllComponent;
	let fixture: ComponentFixture<ViewAllComponent>;
	let rContextMock: any = {
      id: 15,
      context: {
        hub: {
          deliveryUrl: [{ 'origin': 'https://oslo.com/' }]
        }
      },
      elements:
      {
        viewAllLink: {
          linkURL: 'https://www.ibm.com'
        }
      }
    }

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				CommonModule,
				RouterTestingModule.withRoutes([
					{ path: 'test/page/home', component: RouterMockTestComponent }
				])
			],
			declarations: [ViewAllComponent, RouterMockTestComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ViewAllComponent);
		component = fixture.componentInstance;
		component.renderingContext =  rContextMock;
		fixture.detectChanges();
	});

	it('should be created', () => {
		// GIVEN required input value

		// THEN component should be creted
		expect(component).toBeTruthy();

	});

	it('isButtonLinkSet should return value based on the input', () => {
		// GIVEN required input value
		// AND
		// component is created
		expect(component).toBeTruthy();


		// WHEN linkURL is empty
		fixture.detectChanges();

		// THEN isButtonLinkSet should return false
		expect(component.isButtonLinkSet()).toBeFalsy();
	});
});

@Component({
	template: `
    <a routerLink="/test/page/{{pageName}}">link</a>
    <router-outlet></router-outlet>
  `
})

@Component({
	template: ''
})

/**
 * Mocks routerLink
 */
class RouterMockTestComponent {
}
