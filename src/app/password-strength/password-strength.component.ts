import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent {
  @ViewChild('section1') section1!: ElementRef;
  @ViewChild('section2') section2!: ElementRef;
  @ViewChild('section3') section3!: ElementRef;

  password: string = '';

  constructor(private renderer: Renderer2) {}

  checkPasswordStrength(): void {
    if (this.password.length === 0) {
      // Empty field
      this.setSectionColors('gray', 'gray', 'gray');
    } else if (this.password.length < 8) {
      // Password is less than 8 characters
      this.setSectionColors('red', 'gray', 'gray');
    } else if (this.password.length >= 8 && this.password.length < 12) {
      // Password is between 8 and 11 characters
      if (this.containsOnlyLettersDigitsSymbols(this.password)) {
        // Password contains only letters/digits/symbols
        this.setSectionColors('red', 'yellow', 'gray');
      } else {
        // Password contains a combination of letters-symbols/letters-digits/digits-symbols
        this.setSectionColors('yellow', 'yellow', 'gray');
      }
    } else {
      // Password is 12 characters or more
      if (this.containsLettersSymbolsNumbers(this.password)) {
        // Password has letters, symbols, and numbers
        this.setSectionColors('green', 'green', 'green');
      } else {
        // Password does not meet the strong criteria
        this.setSectionColors('yellow', 'yellow', 'green');
      }
    }
  }

  private setSectionColors(
    section1: string,
    section2: string,
    section3: string
  ): void {
    this.renderer.setStyle(
      this.section1.nativeElement,
      'background-color',
      section1
    );
    this.renderer.setStyle(
      this.section2.nativeElement,
      'background-color',
      section2
    );
    this.renderer.setStyle(
      this.section3.nativeElement,
      'background-color',
      section3
    );
  }

  private containsOnlyLettersDigitsSymbols(password: string): boolean {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    return regex.test(password);
  }

  private containsLettersSymbolsNumbers(password: string): boolean {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasSymbols = /[-+_!@#$%^&*.,?]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    return hasLetters && hasSymbols && hasNumbers;
  }
}
