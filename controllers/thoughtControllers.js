// import thought model and reaction model
const { json } = require('express');
const { Thought, Reaction } = require('../models');

// Define thought controllers: get all thoughts, get a single thought by _id, POST to create a new thought(push the created thought's _id to the associated user's thoughts array field),update thought by its _id, delete thought, POST to create a reaction stored in a single thought's reactions array field, DELETE to pull and remove a reaction by the reaction's reactionId value
module.exports={
    getAllThoughts: async (req,res) => {
        try{
            const thoughtsData = await Thought.find();
            res.json(thoughtsData);
        }
        catch(err) {
            res.status(500).json(err);
        }
    },
    getSingleThought: async (req,res) => {
        try{
            const thoughtsData = await Thought.findById(req.params.thoughtId);
            res.json(thoughtsData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    createNewThought: async (req,res) => {
        try{
            const thoughtsData = await Thought.create(req.body);
            res.json(thoughtsData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    updateThought: async (req,res) => {
        try{
            const thoughtsData = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });

            if(!thoughtsData) {
                res.status(404).json({ message: 'Thought not found' });
            }
            else{
                res.json(thoughtsData);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    deleteThought: async (req,res) => {
        try{
            const thoughtsData = await Thought.findByIdAndDelete(req.params.thoughtId);

            if(!thoughtsData){
                return res.status(404).json({ message: 'Thought not found' });
            }
            else{
                res.json(thoughtsData);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    createNewReaction: async (req,res) => {
        try{
            const thoughtsData = await Thought.findByIdAndUpdate(
                {_id:req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true},
            );

            if(!thoughtsData){
                res.status(404).json({message: 'Thought not found'});
            }
            else{
                res.json(thoughtsData);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    deleteReaction: async (req,res) => {
        try{
            const thoughtsData = await Thought.findOneAndRemove(
                {_id: req.params.thoughtId},
                {$pull: {reactions: { reactionId: req.params.reactionId } } },
                {runValidators: true, new: true},
            );

            if(!thoughtsData){
                return res.status(404).json({ message: 'Not found'});
            }

            // check if reaction was removed
            const reactionRemoved = !userData.reactions.includes(req.params.reactionId);

            if(reactionRemoved) {
                res.json({ message: 'Reaction removed', thoughtsData});
            } 
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
};