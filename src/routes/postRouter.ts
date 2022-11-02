import { Router } from 'express';
//import postController from '../controllers/postController';
const router: Router = Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);
router.get('/list', postController.getList);
router.get('/:postId', postController.getPost);
router.put('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);

module.exports = router;