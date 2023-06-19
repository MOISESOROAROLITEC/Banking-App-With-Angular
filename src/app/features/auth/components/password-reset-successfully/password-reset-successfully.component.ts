import { Component } from '@angular/core';
import { UserSharedService } from 'src/app/shared/services/user.shared.service';

@Component({
  selector: 'app-password-reset-successfully',
  templateUrl: './password-reset-successfully.component.html',
  styleUrls: ['./password-reset-successfully.component.scss']
})
export class PasswordResetSuccessfullyComponent {
  constructor(
    private userSharedService: UserSharedService
  ) { }
  goToLoginPage() {
    this.userSharedService.disconnectUser()
  }
}
