import React, { useState } from 'react';
import './HomePage.css';
import { useNavigate} from 'react-router-dom';
import AddUpdateModal from '../AddUpdateModal/AddUpdateModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';

const HomePage = ({users, setUsers}) => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleAdd = (newUser) => {
    console.log('newUser: ', newUser);
    setUsers((prevUsers) => {
      return [...prevUsers, newUser];
    });
    setShowModal(false);
  };

  const handleDelete = (deletedUser) => {
    setUsers((prevUsers) => {
      return prevUsers.filter((user) => user.id !== deletedUser.id);
    });
  }

  const sortUsers = () => {
    setUsers((prevUsers) => {
      return prevUsers.sort((a, b) => {
        return a.username.localeCompare(b.username);
      });
    });
    navigate('/');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    
    <div>
      <h1>Users</h1>
      <div id="add-button">
        <Button variant='primary' onClick={handleShowModal}>Add</Button>
        <Button variant='primary' onClick={sortUsers}>Sort</Button>
        <Button variant='primary' onClick={() => navigate('/chart')}>See chart based on registration year</Button>
      </div>
      <Container fluid style={{alignItems: 'center'}}>
        <Row>
          {users.map((user) => (
            <Col>
              <Card style={{ width: '18rem', marginBottom: '20px' }}>
                <Card.Img variant="top" src={user.avatar} />
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Link to={`/user/${user.id}`}>
                    <Button variant="primary">See details</Button>                            
                  </Link>
                  <Button variant="primary" style={{ marginLeft: '20px'}} onClick={() => handleDelete(user)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <AddUpdateModal isOpen={showModal} onSubmit={handleAdd} userState={{
        id: faker.string.uuid(),
        username: '',
        email: '',
        password: '',
        avatar: faker.image.avatar(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past()
      }} mode="Add" onClose={closeModal}/>
    </div>
        
  );
}

export default HomePage;