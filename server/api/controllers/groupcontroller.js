/**
 * Groups Controller
 * handles every groups related task and authentication
 */

// importing services
import models from '../models/db';

let userID = 0;
export default {
  /**
   * 
   * @param {*} req
   * @param {*} res
   * @return {object} user
   */
  createGroup(req, res) {
    const userName = req.authToken.data.username;
    if (!req.body.name || req.body.name.trim() === '') {
      return res.status(400)
        .send({ message: 'Name parameter is required' });
    }
    if (req.body.name.length > 30 || req.body.desc.length > 120) {
      return res.status(400)
        .send({ error: 'Text too long' });
    }

    return models.Groups
      .create({
        name: req.body.name,
        desc: req.body.desc,
        isArchived: req.body.isArchived || '0'
      })
      .then((group) => {
        if (group) {
          models.Users
            .findOne({
              where: { username: userName }
            })
            .then((user) => {
              userID = user.id;
              models.GroupsUsers
                .create({
                  isAdmin: '1',
                  groupId: group.id,
                  userId: userID
                })
                .then(() => {
                  res.status(201).send({
                    group,
                    message: 'group created successfully'
                  });
                })
                .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send({
        error: error.errors[0].message,
        message: 'Group Already Exists'
      }));
  },

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @return {object} groups
   */
  viewGroups(req, res) {
    const userId = req.authToken.data.id;
    return models.Groups
      .findAll(
        { include: [{
          model: models.Users,
          where: { id: userId },
          attributes: { exclude: ['password'] },
          through: {
            attributes: ['id', 'username'],
          },
          as: 'users'
        }]
        }
      )
      .then((groups) => {
        res.status(200).send(groups);
      })
      .catch(error => res.status(404).send(error));
  }
};
