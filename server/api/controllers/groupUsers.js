/**
 * Groups Users Controller
 * handles every groups users related task and authentication
 */

import models from '../models';

export const groupUsers = {
  /**
   * addMember - add a user to members of a group
   * 
   * @param {object} req 
   * @param {object} res 
   * 
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
   * viewMembers - view members of a single group
   * 
   * @param {object} req 
   * @param {object} res 
   * 
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
   * viewAllGroupMembers - view all members of all groups
   * 
   * @param {object} req 
   * @param {object} res 
   * 
   * @return {object} groupMembers
   */
  viewAllGroupMembers(req, res) {
    const limitValue = req.query.limit || 5;
    const pageValue = (req.query.page - 1) || 0;
    return models.GroupsUsers
      .findAndCountAll({
        limit: limitValue,
        offset: pageValue * limitValue
      })
      .then(groupMembers => res.status(200).send({
        page: (pageValue + 1),
        totalCount: groupMembers.count,
        pageCount: Math.ceil(groupMembers.count / limitValue),
        pageSize: parseInt(groupMembers.rows.length, 10),
        groupMembers: groupMembers.rows
      }))
      .catch(error => res.status(400).send(error));
  },

  /**
   * removeMember - remove a user from a group membership
   * 
   * @param {object} req 
   * @param {object} res 
   * 
   * @return {object} user
   */
  removeMember(req, res) {
    const currentUserId = req.authToken.data.id;
    if (req.query.usersId) {
      if (currentUserId === parseInt(req.query.usersId, 10)) {
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
  },

  /**
   * searchMember - search for a user in the app and in a group
   * 
   * @param {object} req
   * @param {object} res
   * 
   * @return {array} searchItemResult
   */
  searchMember(req, res) {
    if (req.params.page < 0) {
      return res.status(401)
        .send({
          error: { message: 'Page must be a positive number' }
        });
    }
    if (req.query.search && req.query.search !== '') {
      return models.Users
        .findAndCountAll({
          where: {
            username: {
              $iLike: `%${req.query.search}%`,
              $ne: req.authToken.data.username
            }
          },
          distinct: true,
          limit: 2,
          offset: req.params.page,
          attributes: ['id', 'username', 'fullName'],
          include: [{
            model: models.Groups,
            as: 'groups',
            required: false,
            attributes: ['id'],
            through: { attributes: [] }
          }]
        })
        .then((searchItems) => {
          const data = {
            searchItemResult: searchItems
          };
          res.status(200).send(data);
        }).catch(error => res.status(400).send(error));
    }
  }
};
