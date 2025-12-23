import Message from "../models/Message.js";

export const getMessagesByAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  const messages = await Message.find({
    appointment: appointmentId
  })
    .sort({ createdAt: 1 })
    .populate("sender", "name role");

  res.json(messages);
};
export const getRecentChats = async (req, res) => {
  const userId = req.user._id;

  const messages = await Message.aggregate([
    {
      $match: {
        sender: userId
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: "$appointment",
        lastMessage: { $first: "$content" },
        time: { $first: "$createdAt" }
      }
    },
    { $limit: 5 }
  ]);

  res.json(messages);
};
