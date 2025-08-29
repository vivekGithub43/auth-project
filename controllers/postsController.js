// const { createPostSchema } = require("../middlewares/validator");
// const posts = require("../models/postsModel");

// exports.getPosts = async (req,res)=>{
// const {page} = req.query;
// const postsPerPage = 10;  
// try{
// let pageNum = 10;
// if(page <= 1 ){
//     pageNum = 0;
// }else{
//     pageNum = page-1
// }
// const result = await posts.find().sort({createdAt :-1 })
// .skip(pageNum * postsPerPage).limit(postsPerPage)
// .populate({
//     path: 'userId',
// 	select: 'email',
// })
// return res.status(200).json({success:true,message:'posts',data:result})
// }catch(error){

// }
// }

// exports.singlePost = async (req, res) => {
// 	const { _id } = req.query;

// 	try {
// 		const existingPost = await posts.findOne({ _id }).populate({
// 			path: 'userId',
// 			select: 'email',
// 		});
// 		if (!existingPost) {
// 			return res
// 				.status(404)
// 				.json({ success: false, message: 'Post unavailable' });
// 		}
// 		res
// 			.status(200)
// 			.json({ success: true, message: 'single post', data: existingPost });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// exports.createPost = async (req,res)=>{
//   const { title, description } = req.body;
//   const { userId } = req.user;  // always trusted from JWT

//   try {
//     const { error } = createPostSchema.validate({ title, description });
//     if (error) {
//       return res.status(400).json({ success: false, message: error.details[0].message });
//     }

//     const result = await posts.create({ title, description, userId });
//     res.status(201).json({ success: true, message: 'created', data: result });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };


// // exports.updatePost = async (req, res) => {
// // 	const { _id } = req.query;
// // 	const { title, description } = req.body;
// // 	const { userId } = req.user;
// // 	try {
// // 		const { error, value } = createPostSchema.validate({
// // 			title,
// // 			description,
// // 			userId,
// // 		});
// // 		if (error) {
// // 			return res
// // 				.status(401)
// // 				.json({ success: false, message: error.details[0].message });
// // 		}
// // 		const existingPost = await posts.findOne({ _id });
// // 		if (!existingPost) {
// // 			return res
// // 				.status(404)
// // 				.json({ success: false, message: 'Post unavailable' });
// // 		}
// // 		if (existingPost.userId.toString() !== userId) {
// // 			return res.status(403).json({ success: false, message: 'Unauthorized' });
// // 		}
// // 		existingPost.title = title;
// // 		existingPost.description = description;

// // 		const result = await existingPost.save();
// // 		res.status(200).json({ success: true, message: 'Updated', data: result });
// // 	} catch (error) {
// // 		console.log(error);
// // 	}
// // };


// exports.updatePost = async (req, res) => {
//   const { _id } = req.query;   // or req.body if you switch
//   const { title, description } = req.body;
//   const  userId  = req.user.userId;

//   try {
//     const { error } = createPostSchema.validate({ title, description });
//     if (error) {
//       return res
//         .status(401)
//         .json({ success: false, message: error.details[0].message });
//     }

//     const existingPost = await posts.findOne({ _id });
//     if (!existingPost) {
//       return res.status(404).json({ success: false, message: "Post unavailable" });
//     }

//     if (existingPost.userId.toString() !== userId) {
//       return res.status(403).json({ success: false, message: "Unauthorized" });
//     }

//     existingPost.title = title;
//     existingPost.description = description;

//     const result = await existingPost.save();
//     res.status(200).json({ success: true, message: "Updated", data: result });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// exports.deletePost = async (req, res) => {
// 	const { _id } = req.query;

// 	const  userId  = req.user.userId;
// 	try {
// 		const existingPost = await posts.findOne({ _id });
// 		if (!existingPost) {
// 			return res
// 				.status(404)
// 				.json({ success: false, message: 'Post already unavailable' });
// 		}
// 		if (existingPost.userId.toString() !== userId) {
// 			return res.status(403).json({ success: false, message: 'Unauthorized' });
// 		}

// 		await posts.deleteOne({ _id });
// 		res.status(200).json({ success: true, message: 'deleted' });
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// exports.myPosts = async (req, res) => {
//   const { userId } = req.user;  // comes from JWT via identifier middleware
//   const { page = 1 } = req.query;
//   const postsPerPage = 10;

//   try {
//     const pageNum = page <= 1 ? 0 : page - 1;

//     const result = await posts.find({ userId }) // filter only current user's posts
//       .sort({ createdAt: -1 })
//       .skip(pageNum * postsPerPage)
//       .limit(postsPerPage);

//     res.status(200).json({
//       success: true,
//       message: "My posts",
//       data: result
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
const { createPostSchema } = require("../middlewares/validator");
const posts = require("../models/postsModel");

// ----------------- Get all posts with pagination -----------------
exports.getPosts = async (req, res) => {
  const { page = 1 } = req.query;
  const postsPerPage = 10;

  try {
    const pageNum = page <= 1 ? 0 : page - 1;

    const result = await posts.find()
      .sort({ createdAt: -1 })
      .skip(pageNum * postsPerPage)
      .limit(postsPerPage)
      .populate({
        path: "userId",
        select: "name",
      });

    return res.status(200).json({ success: true, message: "posts", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- Single post -----------------
exports.singlePost = async (req, res) => {
  const { _id } = req.query;

  try {
    const existingPost = await posts.findOne({ _id }).populate({
      path: "userId",
      select: "email name",
    });

    if (!existingPost) {
      return res.status(404).json({ success: false, message: "Post unavailable" });
    }

    res.status(200).json({ success: true, message: "single post", data: existingPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- Create post -----------------
exports.createPost = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId; // ✅ trusted from JWT

  try {
    const { error } = createPostSchema.validate({ title, description });
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const result = await posts.create({ title, description, userId });
    res.status(201).json({ success: true, message: "created", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- Update post -----------------
exports.updatePost = async (req, res) => {
  const { _id } = req.query;
  const { title, description } = req.body;
  const userId = req.user.userId;

  try {
    const { error } = createPostSchema.validate({ title, description });
    if (error) {
      return res.status(401).json({ success: false, message: error.details[0].message });
    }

    const existingPost = await posts.findOne({ _id });
    if (!existingPost) {
      return res.status(404).json({ success: false, message: "Post unavailable" });
    }

    // ✅ Fix: normalize both sides
    if (!existingPost.userId.equals(userId)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    existingPost.title = title;
    existingPost.description = description;

    const result = await existingPost.save();
    res.status(200).json({ success: true, message: "Updated", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- Delete post -----------------
exports.deletePost = async (req, res) => {
  const { _id } = req.query;
  const userId = req.user.userId;

  try {
    const existingPost = await posts.findOne({ _id });
    if (!existingPost) {
      return res.status(404).json({ success: false, message: "Post already unavailable" });
    }

    // ✅ Fix: normalize both sides
    if (!existingPost.userId.equals(userId)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await posts.deleteOne({ _id });
    res.status(200).json({ success: true, message: "deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- My posts -----------------
exports.myPosts = async (req, res) => {
  const userId = req.user.userId;
  const { page = 1 } = req.query;
  const postsPerPage = 10;


  try {
    const pageNum = page <= 1 ? 0 : page - 1;

    const result = await posts.find({ userId })
      .sort({ createdAt: -1 })
      .skip(pageNum * postsPerPage)
      .limit(postsPerPage)
    .populate({
        path:"userId",
        select:"name"

    });
    res.status(200).json({
      success: true,
      message: "My posts",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
