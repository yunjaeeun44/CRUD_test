import express from 'express';
import statusCode from '../modules/statusCode'; 
import responseMessage from '../modules/responseMessage';
const util = require('../modules/util');
const db = require('../loaders/db');
const Post = require('../services/post');

/**
 *  @route POST /post/
 *  @desc upload post 
 *  @access Private
 */
const createPost = async (req, res) => {
    const { title, content, category } = req.body; 
    let client;
    try{
        client = await db.connect(req);
        const data = await Post.createPost(client, title, content, category);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.OK, data));
    }catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }finally{
        client.release();
    }
};

/**
 *  @route GET /post/list/?category=
 *  @desc get post by category
 *  @access Private
 */
const getList= async (req, res) => {
    const category: String = req.query.category as String;
    let client;
    try{
        client = await db.connect(req);
        const data = await Post.getList(client, category);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.OK, data));
    }catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }finally{
        client.release();
    }
};

/**
 *  @route GET /post/:postId
 *  @desc get post by postId
 *  @access Private
 */
const getPost= async (req, res) => {
    const { postId } = req.params;
    let client;
    try{
        client = await db.connect(req);
        const data = await Post.getPost(client, postId);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.OK, data));
    }catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }finally{
        client.release();
    }
};

/**
 *  @route PUT /post/:postId
 *  @desc update post by Id
 *  @access Private
 */
const updatePost= async (req, res) => {
    const { postId } = req.params;
    const { title, content, category } = req.body;
    let client;
    try{
        client = await db.connect(req);
        const data = await Post.updatePost(client, postId, title, content, category);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.OK, data));
    }catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }finally{
        client.release();
    }
};

/**
 *  @route DELETE /post/:postId
 *  @desc delete post by postId
 *  @access Private
 */
const deletePost= async (req, res) => {
    const { postId } = req.params;
    let client;
    try{
        client = await db.connect(req);
        const data = await Post.deletePost(client, postId);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.OK, data));
    }catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }finally{
        client.release();
    }
}; 

module.exports = {createPost, getList, getPost, updatePost, deletePost};