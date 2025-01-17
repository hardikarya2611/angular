import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class Form {
  inputName: string = '';
  inputType: string = 'text';
  required: string = 'false';
  inputLabel: string = '';
  formElements: any[] = [];
  generateHtml: string = '';

  constructor(private router: Router) { }

  giveForm() {
    if (!this.inputName || !this.inputLabel) {
      alert('Please fill out all required fields');
      return;
    }

    const newElement = {
      name: this.inputName,
      label: this.inputLabel,
      type: this.inputType,
      required: this.required === 'true',
    };

    this.formElements.push(newElement);


    this.inputName = '';
    this.inputType = 'text';
    this.required = 'false';
    this.inputLabel = '';
  }

  createForm() {

    let formHTML = '<form id="dynamicForm">\n';

    this.formElements.forEach(element => {
      formHTML += `  <label for="${element.name}">${element.label}</label>\n`;

      if (element.type === 'dropdown') {
        formHTML += `  <select name="${element.name}" id="${element.name}"${element.required ? ' required' : ''}>\n`;
        formHTML += `    <option value="Option 1">Option 1</option>\n`;
        formHTML += `  </select>\n`;
      } else {
        formHTML += `  <input type="${element.type}" name="${element.name}" id="${element.name}"${element.required ? ' required' : ''}>\n`;
      }
    });

    formHTML += '</form>';

    this.generateHtml = formHTML;
  }
}