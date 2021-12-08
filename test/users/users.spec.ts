import test from 'japa';
import supertest from 'supertest';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/`;
test.group('User', () => {
  test('it should create an user', async (assert) => {
    const userPayload = {
      email: 'teste@teste.com',
      username: 'teste',
      password: 'teste',
      avatar: 'https://teste.com/avatar',
      uuid: '6bccf095-b515-4a86-929c-e0353a9a5c2f',
    };
    const { body } = await supertest(BASE_URL).post('user').send(userPayload).expect(201);
    assert.exists(body.user, 'User undefined');
    assert.exists(body.user.id, 'User id undefined');
    assert.exists(body.user.email, 'User email undefined');
    assert.exists(body.user.username, 'User username undefined');
    assert.exists(body.user.password, 'User password undefined');
    assert.exists(body.user.avatar, 'User avatar undefined');
    assert.exists(body.user.uuid, 'User uuid undefined');
    
  });
});
