import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from 'src/app/app/settings/settings.component';
import { FlowItemComponent } from 'src/app/app/flows/components/flow-item/flow-item.component';
import { FlowsComponent } from 'src/app/app/flows/flows.component';
import { FlowTopbarComponent } from 'src/app/app/flows/flow-topbar/flow-topbar.component';
import { ViewFlowPageComponent } from 'src/app/app/flows/view-flow-page/view-flow-page.component';
import { FlowLoadingComponent } from '../app/flows/components/flow-loading/flow-loading.component';
import { FlowRouteItemComponent } from '../app/flows/components/flow-route-item/flow-route-item.component';
import { FlowsLoadingComponent } from '../app/flows/components/flows-loading/flows-loading.component';
import { FlowRouteComponent } from '../app/flows/flow-route/flow-route.component';
import { SaveFlowFormComponent } from '../app/flows/form/save-flow/save-flow.component';
import { SendFlowFormComponent } from '../app/flows/form/send-flow/send-flow.component';
import { SaveFlowPageComponent } from '../app/flows/save-flow-page/save-flow-page.component';
import { AssignFlowComponent } from '../app/flows/assign-flow/assign-flow.component';

@NgModule({
  declarations: [
    AssignFlowComponent,
    FlowsComponent,
    FlowItemComponent,
    ViewFlowPageComponent,
    FlowTopbarComponent,
    SettingsComponent,
    SaveFlowPageComponent,
    SaveFlowFormComponent,
    SendFlowFormComponent,
    FlowsLoadingComponent,
    FlowLoadingComponent,
    FlowRouteComponent,
    FlowRouteItemComponent,
  ],
  imports: [CommonModule],
})
export class FlowModule {}
