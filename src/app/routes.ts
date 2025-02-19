import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { FormularioComponent } from './formulario/formulario.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Home details',
    },
    {
        path: 'app-formulario',
        component: FormularioComponent,
        title: 'form'
    }
];
export default routeConfig;