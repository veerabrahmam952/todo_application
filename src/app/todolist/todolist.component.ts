import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  @ViewChild('taskForm') taskForm!: NgForm;
  taskArray = [
    { taskName: 'Brush teeth', isCompleted: false, isEdited: false },
  ];
  taskName = '';
  taskInputName = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.taskArray.push({
      taskName: this.taskName,
      isCompleted: false,
      isEdited: false,
    });

    this.taskForm.reset();
  }

  onDelete(index: number): void {
    this.taskArray.splice(index, 1);
  }

  onCheck(index: number): void {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
  }

  onEdit(index: number): void {
    this.taskInputName = this.taskArray[index].taskName;
    this.taskArray[index].isEdited = true;
  }

  onSave(taskName: string, index: number): void {
    this.taskArray[index].taskName = taskName;
    this.taskArray[index].isEdited = false;
  }

  get isTaskEdit(): boolean {
    return this.taskArray.filter((task) => task.isEdited === true).length > 0;
  }
}
