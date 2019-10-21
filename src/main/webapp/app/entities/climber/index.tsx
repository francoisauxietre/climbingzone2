import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Climber from './climber';
import ClimberDetail from './climber-detail';
import ClimberUpdate from './climber-update';
import ClimberDeleteDialog from './climber-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ClimberUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ClimberUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClimberDetail} />
      <ErrorBoundaryRoute path={match.url} component={Climber} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ClimberDeleteDialog} />
  </>
);

export default Routes;
