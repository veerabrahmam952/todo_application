import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TodolistComponent } from './todolist.component';

describe('TodolistComponent', () => {
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodolistComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function submitForm(): void {
    const submitButton = fixture.debugElement.query(By.css('form'));
    submitButton.triggerEventHandler('ngSubmit');
    fixture.detectChanges();
  }

  function onEdit(index: number): void {
    const editBtnElm = fixture.debugElement.query(By.css(`#edited_${index}`));
    editBtnElm.triggerEventHandler('click', index);
    fixture.detectChanges();
  }

  function addTaksInputText(taskName: string): void {
    const taskInputElm =
      fixture.debugElement.nativeElement.querySelector('#taskName');
    taskInputElm.value = taskName;
    taskInputElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function onSave(taskName: string, index: number): void {
    const saveBtnElm = fixture.debugElement.query(By.css(`#save_${index}`));
    saveBtnElm.triggerEventHandler('click', { taskName, index });
    fixture.detectChanges();
  }

  function onCancel(index: number): void {
    const cancelBtnElm = fixture.debugElement.query(By.css(`#cancel_${index}`));
    cancelBtnElm.triggerEventHandler('click');
    fixture.detectChanges();
  }

  function onCheck(index: number): void {
    const checklBtnElm = fixture.debugElement.query(
      By.css(`#completed_${index}`)
    );
    checklBtnElm.triggerEventHandler('change', index);
    fixture.detectChanges();
  }

  function onDelete(index: number): void {
    const deleteBtnElm = fixture.debugElement.query(
      By.css(`#deleted_${index}`)
    );
    deleteBtnElm.triggerEventHandler('click', index);
    fixture.detectChanges();
  }

  function addTaksInputName(taskName: string, index: number): void {
    const taskInputElm = fixture.debugElement.nativeElement.querySelector(
      `#taskInput_${index}`
    );
    taskInputElm.value = taskName;
    taskInputElm.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('task interactions', () => {
    it('display with predefined data', () => {
      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      const row1 = tableRows[1];

      expect(row1.cells[0].innerHTML).toBe('Brush teeth');
    });

    it('adds new task on with form valid and submit button clicks', () => {
      addTaksInputText('Task 0');
      submitForm();

      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      const row1 = tableRows[1];
      const row2 = tableRows[2];

      expect(row1.cells[0].innerHTML).toBe('Brush teeth');
      expect(row2.cells[0].innerHTML).toBe('Task 0');
    });

    it('modifies the model on Add task and submit button clicks', () => {
      const resetSpy = spyOn(component.taskForm, 'reset');
      addTaksInputText('Task 0');
      submitForm();

      expect(component.taskArray).toEqual([
        { taskName: 'Brush teeth', isCompleted: false, isEdited: false },
        { taskName: 'Task 0', isCompleted: false, isEdited: false },
      ]);
      expect(resetSpy).toHaveBeenCalled();
    });
    it('edit task and clicks on save button', () => {
      addTaksInputText('Task 0');
      submitForm();

      onEdit(1);
      addTaksInputName('Task 1', 1);
      onSave('Task 1', 1);

      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      const row2 = tableRows[2];

      expect(row2.cells[0].innerHTML).toBe('Task 1');
    });

    it('modifies the model on Edi task', () => {
      addTaksInputText('Task 0');
      submitForm();

      onEdit(1);
      addTaksInputName('Task 1', 1);
      onSave('Task 1', 1);

      expect(component.taskArray).toEqual([
        { taskName: 'Brush teeth', isCompleted: false, isEdited: false },
        { taskName: 'Task 1', isCompleted: false, isEdited: false },
      ]);
    });

    it('do not update task on edit and clicks on cancel button', () => {
      addTaksInputText('Task 0');
      submitForm();

      onEdit(1);
      addTaksInputName('Task 1', 1);
      onCancel(1);

      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      const row2 = tableRows[2];

      expect(row2.cells[0].innerHTML).toBe('Task 0');
    });

    it('do not modifies the model on edi task and clicks on cancel button', () => {
      addTaksInputText('Task 0');
      submitForm();

      onEdit(1);
      addTaksInputName('Task 1', 1);
      onCancel(1);

      expect(component.taskArray).toEqual([
        { taskName: 'Brush teeth', isCompleted: false, isEdited: false },
        { taskName: 'Task 0', isCompleted: false, isEdited: false },
      ]);
    });

    it('update completed check box on checked', () => {
      addTaksInputText('Task 0');
      submitForm();

      onCheck(1);

      const checklBtnElm =
        fixture.debugElement.nativeElement.querySelector('#completed_0');
      fixture.detectChanges();

      expect(checklBtnElm.value).toBe('on');
    });

    it('modifies the model on completed checkbox checked', () => {
      addTaksInputText('Task 0');
      submitForm();

      onCheck(1);

      expect(component.taskArray).toEqual([
        { taskName: 'Brush teeth', isCompleted: false, isEdited: false },
        { taskName: 'Task 0', isCompleted: true, isEdited: false },
      ]);
    });

    it('display the data on delete row', () => {
      addTaksInputText('Task 0');
      submitForm();

      onDelete(1);
      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      const row1 = tableRows[1];
      fixture.detectChanges();

      expect(tableRows.length).toEqual(2);
      expect(row1.cells[0].innerHTML).toBe('Brush teeth');
    });

    it('modifies the model on delete button clicked', () => {
      addTaksInputText('Task 0');
      submitForm();

      onDelete(1);

      expect(component.taskArray).toEqual([
        { taskName: 'Brush teeth', isCompleted: false, isEdited: false },
      ]);
    });

    it('disables submit button on form invalid', () => {
      addTaksInputText('');

      const submitButton = fixture.debugElement.query(By.css('#submitButton'));

      expect(submitButton.nativeElement.disabled).toBeTruthy();
    });

    it('not disables submit button on form valid', () => {
      addTaksInputText('Task 0');

      const submitButton = fixture.debugElement.query(By.css('#submitButton'));

      expect(submitButton.nativeElement.disabled).toBeFalsy();
    });

    it('displays the error message on form invalid and dirty', () => {
      addTaksInputText('Task 0');
      addTaksInputText('');

      const errorMessage = fixture.debugElement.query(By.css('#errorMessage'));

      expect(errorMessage.nativeNode.outerText).toEqual('Required field');
    });

    it('disable the edit button while being task edit', () => {
      addTaksInputText('Task 0');
      submitForm();

      onEdit(1);

      const editButton = fixture.debugElement.query(By.css('#edited_1'));

      expect(editButton.nativeElement.disabled).toBeTrue();
    });
  });
});
