// basic pipeline of aggreagate
db.account.aggregate([
  {
    $match: {
      eventId: "",
    },
  },
  [
    {
      $facet: {
        data: [
          {
            $project: {
              memberId: 1,
              winAmt: 1,
            },
          },
          {
            $group: {
              _id: "$memberId",
              winnings: { $sum: "$winAmt" },
            },
          },
          {
            $project: {
              winnings: 1,
              player: "$_id",
              _id: 0,
            },
          },
          {
            $sort: {
              winnings: -1,
            },
          },
          {
            $skip: 0,
          },
          {
            $limit: 50,
          },
          {
            $lookup: {
              from: "members",
              localField: "player",
              foreignField: "_id",
              as: "player",
            },
          },
          {
            $unwind: {
              path: "$player",
            },
          },
          {
            $project: {
              winnings: 1,
              player: "$player._id",
              status: "&player.status",
            },
          },
          {
            $match: {
              status: "Active",
            },
          },
        ],
        count: [{ $count: "count" }],
      },
    },
  ],
]);

//geonear
db.account.aggregate([
  {
    $geoNear: {
      near: { type: "Point", coordinates: [-73.99279, 40.719296] },
      distanceField: "distance",
      spherical: true,
      distanceMultiplier: 0.001,
    },
  },
  {
    $project: {
      distance: 1,
      username: 1,
      city: "$location.city",
    },
  },
]);
