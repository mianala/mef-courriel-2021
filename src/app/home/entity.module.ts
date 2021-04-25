import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewEntityComponent } from '../app/entities/add-new-entity/add-new-entity.component';
import { EntityAutocompleteComponent } from '../app/entities/components/entity-autocomplete/entity-autocomplete.component';
import { EditEntityComponent } from '../app/entities/edit-entity/edit-entity.component';
import { EntityPageComponent } from '../app/entities/entity-page/entity-page.component';
import { EntityComponent } from '../app/entities/entity/entity.component';
import { EntitiesChipAutocompleteComponent } from '../app/entities/components/entities-chip-autocomplete/entities-chip-autocomplete.component';
import { EntitiesComponent } from '../app/entities/entities.component';
import { LabelsComponent } from '../app/flows/components/labels/labels.component';
import { LetterTextsComponent } from '../app/flows/components/letter-texts/letter-texts.component';
import { ObservationsComponent } from '../app/flows/components/observations/observations.component';

@NgModule({
  declarations: [
    EntityComponent,
    AddNewEntityComponent,
    EditEntityComponent,
    EntityPageComponent,
    EntityAutocompleteComponent,
    EntitiesComponent,
    EntitiesChipAutocompleteComponent,
    LabelsComponent,
    ObservationsComponent,
    LetterTextsComponent,
  ],
  imports: [CommonModule],
})
export class EntityModule {}
