import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appCanRegisterTeam]'
})
export class CanRegisterTeamDirective {
  private hasView = false;
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  @Input() set appCanRegisterTeam(permissions: string[]) {
    if (permissions.includes('can-register-team') && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!permissions.includes('can-register-team') && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
