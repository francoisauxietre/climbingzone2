import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getClimbers } from 'app/entities/climber/climber.reducer';
import { getEntity, updateEntity, createEntity, reset } from './climber.reducer';
import { IClimber } from 'app/shared/model/climber.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClimberUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClimberUpdateState {
  isNew: boolean;
  idsfriends: any[];
}

export class ClimberUpdate extends React.Component<IClimberUpdateProps, IClimberUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsfriends: [],
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

    this.props.getClimbers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { climberEntity } = this.props;
      const entity = {
        ...climberEntity,
        ...values,
        friends: mapIdList(values.friends)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/climber');
  };

  render() {
    const { climberEntity, climbers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="climbingzone2App.climber.home.createOrEditLabel">
              <Translate contentKey="climbingzone2App.climber.home.createOrEditLabel">Create or edit a Climber</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : climberEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="climber-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="climber-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="climber-firstName">
                    <Translate contentKey="climbingzone2App.climber.firstName">First Name</Translate>
                  </Label>
                  <AvField id="climber-firstName" type="text" name="firstName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="climber-lastName">
                    <Translate contentKey="climbingzone2App.climber.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="climber-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="birthLabel" for="climber-birth">
                    <Translate contentKey="climbingzone2App.climber.birth">Birth</Translate>
                  </Label>
                  <AvField id="climber-birth" type="date" className="form-control" name="birth" />
                </AvGroup>
                <AvGroup>
                  <Label for="climber-friends">
                    <Translate contentKey="climbingzone2App.climber.friends">Friends</Translate>
                  </Label>
                  <AvInput
                    id="climber-friends"
                    type="select"
                    multiple
                    className="form-control"
                    name="friends"
                    value={climberEntity.friends && climberEntity.friends.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {climbers
                      ? climbers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/climber" replace color="info">
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
  climbers: storeState.climber.entities,
  climberEntity: storeState.climber.entity,
  loading: storeState.climber.loading,
  updating: storeState.climber.updating,
  updateSuccess: storeState.climber.updateSuccess
});

const mapDispatchToProps = {
  getClimbers,
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
)(ClimberUpdate);
