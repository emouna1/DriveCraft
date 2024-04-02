import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Candidate } from '../condidat.interface';

@Component({
  selector: 'app-edit-candidate-dialog',
  templateUrl: './edit-candidate-dialog.component.html',
  styleUrl: './edit-candidate-dialog.component.css'
})
export class EditCandidateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditCandidateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public candidate: Candidate
  ) {}

  onSave(): void {
    // You can perform validation here before closing the dialog
    this.dialogRef.close(this.candidate);
  }
}

