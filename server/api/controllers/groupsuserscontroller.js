/**
 * Groups Users Controller
 * handles every groups users related task and authentication
 */

import models from '../models/db';

// let userName = "";
export default {
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @return {object} response
   */
  addMember(req, res) {
    if (!req.body.userId) {
      res.status(400)
        .send({ error: { message: 'userId parameter is required' } });
      return;
    }

    if (!req.params.id) {
      res.status(400)
        .send({ error: { message: 'GroupId parameter is required' } });
      return;
    }

    models.GroupsUsers
      .find({
        where: {
          userId: req.body.userId,
          groupId: req.param.id
        }
      })
      .then((response) => {
        if (response) {
          return res.status(400)
            .send({
              error: { message: 'user already exist in group' }
            });
        }
        return models.GroupsUsers
          .create({
            userId: req.body.userId,
            groupId: req.params.id,
            isAdmin: '0'
          })
          .then((result) => {
            res.status(201).send(result);
          })
          .catch((error) => {
            res.status(400).send(error);
          });
      });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @return {object} members
   */
  viewMembers(req, res) {
    return models.Groups
      .findAll({
        where: { id: req.params.id },
        include: [{
          model: models.Users,
          through: {
            attributes: ['id', 'username'],
          },
          as: 'users'
        }]
      })
      .then((members) => {
        res.status(200).send(members[0].users);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @return {object} groupMembers
   */
  viewAllGroupMembers(req, res) {
    return models.GroupsUsers
      .findAll()
      .then(groupMembers => res.status(200).send(groupMembers))
      .catch(error => res.status(400).send(error));
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @return {object} user
   */
  removeMember(req, res) {
    const currentUserId = req.authToken.data.id;
    models.GroupsUsers
      .find({
        where: {
          userId: currentUserId,
          groupId: req.params.id
        }
      }).then(
        (user) => {
          if (user.isAdmin === '1') {
            if (req.query.usersId) {
              if (user.userId === req.query.usersId) {
                return res.status(403).send({
                  message: 'You cannot remove yourself'
                });
              }
              return models.GroupsUsers
                .destroy({
                  where: {
                    userId: req.query.usersId,
                    groupId: req.params.id
                  },
                  force: true
                // truncate: true, cascade: true
                })
                .then((result) => {
                  res.status(202).send({
                    result,
                    message: 'User Removed Successfully'
                  });
                })
                .catch((error) => {
                  res.status(400).send({
                    error,
                    message: 'Error Occured While trying to remove User'
                  });
                });
            }
          } else {
            return res.status(400).send({
              message: 'User Is not an Admin'
            });
          }
        }
      ).catch((error) => {
        res.status(400).send({
          error,
          message: 'Sorry user is not a member of the group'
        });
      });
  },

  /**
   * 
   * @param {*} req
   * @param {*} res
   * @return {array} searchItemResult
   */
  searchMember(req, res) {
    if (req.query.search) {
      console.log(req.query.search);
      models.GroupsUsers
        .findAll({
          where: { groupId: req.params.id },
          attributes: ['userId']
        })
        .then((groupUsers) => {
          const groupUsersId = groupUsers
            .map(groupUser => `${groupUser.userId}`);
          models.Users
            .findAll({
              where: {
                username: {
                  $like: `%${req.query.search}%`
                }
              },
              limit: 10,
              attributes: ['id', 'username', 'fullName'],
              include: [{
                model: models.Groups,
                as: 'groups',
                required: false,
                attributes: ['id'],
                through: { attributes: [] }
              }]
            })
            .then((searchItemResult) => {
              const data = {
                groupUsersId,
                searchItemResult
              };
              return res.status(200).send(data);
            }).catch(error => res.status(400).send(error));
        }).catch(error => res.status(400).send(error));
    }
  }
};
