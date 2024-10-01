import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-modal',
  templateUrl: './date-modal.component.html',
  styleUrls: ['./date-modal.component.css']
})
export class DateModalComponent {
  // Existing properties
  workingHourFrom1: string = '';
  workingHourTo1: string = '';
  workingHourFrom2: string = '';
  workingHourTo2: string = '';
  workingHourFrom3: string = '';
  workingHourTo3: string = '';
  workingHourFrom4: string = '';
  workingHourTo4: string = '';

  // Visibility properties
  showSecondSet: boolean = false;
  showThirdSet: boolean = false;
  showFourthSet: boolean = false;

  // New property for the multiline text box
  notes: string = '';

  @Input() modalData: any;
  @Output() closeModal = new EventEmitter<any>();
  @Output() saveData = new EventEmitter<any>();

  onClose() {
    console.log("Closed without saving");
    this.closeModal.emit();
  }

  onApplyToAll() {
    // Logic to apply the current working hours and notes to all days or items
    const objectData: any = {
      workingHourFrom1: this.workingHourFrom1,
      workingHourTo1: this.workingHourTo1,
      notes: this.notes
    };
  
    if (this.showSecondSet) {
      objectData.workingHourFrom2 = this.workingHourFrom2;
      objectData.workingHourTo2 = this.workingHourTo2;
    }
  
    if (this.showThirdSet) {
      objectData.workingHourFrom3 = this.workingHourFrom3;
      objectData.workingHourTo3 = this.workingHourTo3;
    }
  
    if (this.showFourthSet) {
      objectData.workingHourFrom4 = this.workingHourFrom4;
      objectData.workingHourTo4 = this.workingHourTo4;
    }
  
    console.log('Applying to all with data:', objectData);
  
    // Emit the collected data to the parent or trigger any action that applies it to all days
    // You can emit another event or make a call to update other parts of the application
    this.saveData.emit({ applyToAll: true, data: objectData });
  
    // Optionally close the modal after applying to all
    this.closeModal.emit();
  }
  

  onSave() {
    const objectData: any = {
      workingHourFrom1: this.workingHourFrom1,
      workingHourTo1: this.workingHourTo1,
      notes: this.notes
    };
    
    if (this.showSecondSet) {
      objectData.workingHourFrom2 = this.workingHourFrom2;
      objectData.workingHourTo2 = this.workingHourTo2;
    }

    if (this.showThirdSet) {
      objectData.workingHourFrom3 = this.workingHourFrom3;
      objectData.workingHourTo3 = this.workingHourTo3;
    }

    if (this.showFourthSet) {
      objectData.workingHourFrom4 = this.workingHourFrom4;
      objectData.workingHourTo4 = this.workingHourTo4;
    }

    console.log('Data from modal:', objectData);

    // Emit the collected data to parent component
    this.saveData.emit(objectData);

    // Close the modal
    this.closeModal.emit();
  }

  // Format the time to HH:mm as user types
  formatTime(id: string): void {
    let value: string;

    switch (id) {
      case 'working-hour-from-1':
        value = this.workingHourFrom1;
        break;
      case 'working-hour-to-1':
        value = this.workingHourTo1;
        break;
      case 'working-hour-from-2':
        value = this.workingHourFrom2;
        break;
      case 'working-hour-to-2':
        value = this.workingHourTo2;
        break;
      case 'working-hour-from-3':
        value = this.workingHourFrom3;
        break;
      case 'working-hour-to-3':
        value = this.workingHourTo3;
        break;
      case 'working-hour-from-4':
        value = this.workingHourFrom4;
        break;
      case 'working-hour-to-4':
        value = this.workingHourTo4;
        break;
      default:
        return;
    }

    value = value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 4) {
      value = value.substring(0, 4); // Limit to 4 characters
    }

    // Format as HH:mm
    if (value.length >= 2) {
      value = `${value.substring(0, 2)}:${value.substring(2)}`;
    }

    // Validate hours and minutes
    const [hours, minutes] = value.split(':').map(Number);
    if (hours >= 24) {
      value = `23:${minutes < 10 ? '0' + minutes : minutes}`;
    } else if (minutes >= 60) {
      value = `${hours < 10 ? '0' + hours : hours}:59`;
    }

    // Update ngModel
    switch (id) {
      case 'working-hour-from-1':
        this.workingHourFrom1 = value;
        break;
      case 'working-hour-to-1':
        this.workingHourTo1 = value;
        break;
      case 'working-hour-from-2':
        this.workingHourFrom2 = value;
        break;
      case 'working-hour-to-2':
        this.workingHourTo2 = value;
        break;
      case 'working-hour-from-3':
        this.workingHourFrom3 = value;
        break;
      case 'working-hour-to-3':
        this.workingHourTo3 = value;
        break;
      case 'working-hour-from-4':
        this.workingHourFrom4 = value;
        break;
      case 'working-hour-to-4':
        this.workingHourTo4 = value;
        break;
    }

    // Update the input field
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.value = value;
    }
  }

  toggleSetNew(show: boolean) {
    if (show) {
      if (!this.showSecondSet) {
        this.showSecondSet = true;
        return;
      }
      if (!this.showThirdSet) {
        this.showThirdSet = true;
        return;
      }
      if (!this.showFourthSet) {
        this.showFourthSet = true;
        return;
      }
    } else {
      if (this.showFourthSet) {
        this.showFourthSet = false;
        this.workingHourFrom4 = '';
        this.workingHourTo4 = '';
        return;
      }
      if (this.showThirdSet) {
        this.showThirdSet = false;
        this.workingHourFrom3 = '';
        this.workingHourTo3 = '';
        return;
      }
      if (this.showSecondSet) {
        this.showSecondSet = false;
        this.workingHourFrom2 = '';
        this.workingHourTo2 = '';
        return;
      }
    }
  }
  
}

