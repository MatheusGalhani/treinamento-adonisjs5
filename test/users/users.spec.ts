import Database from '@ioc:Adonis/Lucid/Database';
import { UserFactory } from 'Database/factories';
import test from 'japa';
import supertest from 'supertest';

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/`;
test.group('User', (group) => {
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
    assert.notExists(body.user.password, 'Password defined');
    assert.exists(body.user.avatar, 'User avatar undefined');
    assert.exists(body.user.uuid, 'User uuid undefined');
  });

  test('it should return 409 when email is already in use', async (assert) => {
    const { email } = await UserFactory.create();
    const { body } = await supertest(BASE_URL)
      .post('user')
      .send({
        email,
        username: 'teste',
        password: 'teste',
        avatar: 'https://teste.com/avatar',
        uuid: 'ad4867fc-89b6-4e64-9dc4-fa5f1f3d8eec',
      })
      .expect(409);
      assert.exists(body.message);
      assert.exists(body.code);
      assert.exists(body.status);
      assert.include(body.message, 'email');
      assert.equal(body.code, "BAD_REQUEST");
      assert.equal(body.status, 409);
  });

  test('it should return 409 when username is already in use', async (assert) => {
    const { username } = await UserFactory.create();
    const { body } = await supertest(BASE_URL)
      .post('user')
      .send({
        username,
        email: 'teste@teste.com',
        password: 'teste',
        avatar: 'https://teste.com/avatar',
        uuid: '87f82a8b-5bf2-4811-bf32-cae04ed5d5d2',
      })
      .expect(409);
      assert.exists(body.message);
      assert.exists(body.code);
      assert.exists(body.status);
      assert.include(body.message, 'username');
      assert.equal(body.code, "BAD_REQUEST");
      assert.equal(body.status, 409);
  });

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction();
  });
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction();
  });
});
