import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app.js';
import { Quiz } from '../models/quiz.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);

before(async () => {
    const testDbUri = process.env.MONGODB_URI.replace(/\/?$/, '/quizboard-test');
    await mongoose.connect(testDbUri);
});

afterEach(async () => {
    await Quiz.deleteMany({});
});

after(async () => {
    await mongoose.connection.close();
});

describe('Quiz Creation', () => {

    it('should create a quiz and return 201', async () => {
        const res = await request
            .post('/api/v1/quizzes')
            .send({
                title: 'Test Quiz',
                questions: [{ question: 'What is 2+2?', answer: '4' }],
                createdBy: 'temp-user-id'
            });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('quiz');
        expect(res.body.quiz).to.have.property('title', 'Test Quiz');
        expect(res.body.quiz.questions).to.have.lengthOf(1);
    });

    it('should save the quiz to the database', async () => {
        const res = await request
            .post('/api/v1/quizzes')
            .send({
                title: 'DB Test Quiz',
                questions: [{ question: 'Q1', answer: 'A1' }],
                createdBy: 'temp-user-id'
            });

        const saved = await Quiz.findById(res.body.quiz.id);
        expect(saved).to.not.be.null;
        expect(saved.title).to.equal('DB Test Quiz');
    });

    it('should return 400 if title is missing', async () => {
        const res = await request
            .post('/api/v1/quizzes')
            .send({
                questions: [{ question: 'Q1', answer: 'A1' }],
                createdBy: 'temp-user-id'
            });

        expect(res.status).to.equal(400);
    });

    it('should return 400 if a question is missing an answer', async () => {
        const res = await request
            .post('/api/v1/quizzes')
            .send({
                title: 'Incomplete Quiz',
                questions: [{ question: 'Q1', answer: '' }],
                createdBy: 'temp-user-id'
            });

        expect(res.status).to.equal(400);
    });

});

describe('Fetching Quizzes', () => {

    it('should return all quizzes as an array', async () => {
        await Quiz.create({
            title: 'Seeded Quiz',
            questions: [{ question: 'Q1', answer: 'A1' }],
            createdBy: 'temp-user-id'
        });

        const res = await request.get('/api/v1/quizzes');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(1);
    });

    it('should return a single quiz by id', async () => {
        const quiz = await Quiz.create({
            title: 'Single Quiz',
            questions: [{ question: 'Q1', answer: 'A1' }],
            createdBy: 'temp-user-id'
        });

        const res = await request.get(`/api/v1/quizzes/${quiz._id}`);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('title', 'Single Quiz');
    });

    it('should return 404 for a quiz that does not exist', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request.get(`/api/v1/quizzes/${fakeId}`);

        expect(res.status).to.equal(404);
    });

});

describe('Updating Quizzes', () => {

    it('should update a quiz title and return 200', async () => {
        const quiz = await Quiz.create({
            title: 'Original Title',
            questions: [{ question: 'Q1', answer: 'A1' }],
            createdBy: 'temp-user-id'
        });

        const res = await request
            .put(`/api/v1/quizzes/${quiz._id}`)
            .send({ title: 'Updated Title', questions: [{ question: 'Q1', answer: 'A1' }] });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('title', 'Updated Title');
    });

    it('should save the updated title to the database', async () => {
        const quiz = await Quiz.create({
            title: 'Original Title',
            questions: [{ question: 'Q1', answer: 'A1' }],
            createdBy: 'temp-user-id'
        });

        await request
            .put(`/api/v1/quizzes/${quiz._id}`)
            .send({ title: 'Updated Title', questions: [{ question: 'Q1', answer: 'A1' }] });

        const updated = await Quiz.findById(quiz._id);
        expect(updated.title).to.equal('Updated Title');
    });

    it('should update the questions on a quiz', async () => {
        const quiz = await Quiz.create({
            title: 'My Quiz',
            questions: [{ question: 'Old Q', answer: 'Old A' }],
            createdBy: 'temp-user-id'
        });

        const res = await request
            .put(`/api/v1/quizzes/${quiz._id}`)
            .send({ title: 'My Quiz', questions: [{ question: 'New Q', answer: 'New A' }] });

        expect(res.status).to.equal(200);
        expect(res.body.questions[0].question).to.equal('New Q');
        expect(res.body.questions[0].answer).to.equal('New A');
    });

    it('should return 404 when updating a quiz that does not exist', async () => {
        const fakeId = new mongoose.Types.ObjectId();

        const res = await request
            .put(`/api/v1/quizzes/${fakeId}`)
            .send({ title: 'Does not matter', questions: [{ question: 'Q1', answer: 'A1' }] });

        expect(res.status).to.equal(404);
    });

});


describe('Deleting Quizzes', () => {

    it('should delete a quiz and return 200', async () => {
        const quiz = await Quiz.create({
            title: 'Quiz to Delete',
            questions: [{ question: 'Q1', answer: 'A1' }],
            createdBy: 'temp-user-id'
        });

        const res = await request.delete(`/api/v1/quizzes/${quiz._id}`);

        expect(res.status).to.equal(200);

        const deleted = await Quiz.findById(quiz._id);
        expect(deleted).to.be.null;
    });

});
