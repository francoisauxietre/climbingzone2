import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './route.reducer';
import { IRoute } from 'app/shared/model/route.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRouteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRouteUpdateState {
  isNew: boolean;
}

export class RouteUpdate extends React.Component<IRouteUpdateProps, IRouteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { routeEntity } = this.props;
      const entity = {
        ...routeEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/route');
  };

  render() {
    const { routeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="climbingzone2App.route.home.createOrEditLabel">
              <Translate contentKey="climbingzone2App.route.home.createOrEditLabel">Create or edit a Route</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : routeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="route-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="route-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="route-name">
                    <Translate contentKey="climbingzone2App.route.name">Name</Translate>
                  </Label>
                  <AvField id="route-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="latitudeLabel" for="route-latitude">
                    <Translate contentKey="climbingzone2App.route.latitude">Latitude</Translate>
                  </Label>
                  <AvField id="route-latitude" type="string" className="form-control" name="latitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="longitudeLabel" for="route-longitude">
                    <Translate contentKey="climbingzone2App.route.longitude">Longitude</Translate>
                  </Label>
                  <AvField id="route-longitude" type="string" className="form-control" name="longitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="physiqueLabel" for="route-physique">
                    <Translate contentKey="climbingzone2App.route.physique">Physique</Translate>
                  </Label>
                  <AvField id="route-physique" type="string" className="form-control" name="physique" />
                </AvGroup>
                <AvGroup>
                  <Label id="techniqueLabel" for="route-technique">
                    <Translate contentKey="climbingzone2App.route.technique">Technique</Translate>
                  </Label>
                  <AvField id="route-technique" type="string" className="form-control" name="technique" />
                </AvGroup>
                <AvGroup>
                  <Label id="tactiqueLabel" for="route-tactique">
                    <Translate contentKey="climbingzone2App.route.tactique">Tactique</Translate>
                  </Label>
                  <AvField id="route-tactique" type="string" className="form-control" name="tactique" />
                </AvGroup>
                <AvGroup>
                  <Label id="mentalLabel" for="route-mental">
                    <Translate contentKey="climbingzone2App.route.mental">Mental</Translate>
                  </Label>
                  <AvField id="route-mental" type="string" className="form-control" name="mental" />
                </AvGroup>
                <AvGroup>
                  <Label id="niveauLabel" for="route-niveau">
                    <Translate contentKey="climbingzone2App.route.niveau">Niveau</Translate>
                  </Label>
                  <AvField id="route-niveau" type="text" name="niveau" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/route" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  routeEntity: storeState.route.entity,
  loading: storeState.route.loading,
  updating: storeState.route.updating,
  updateSuccess: storeState.route.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteUpdate);
