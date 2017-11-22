/**
 * Groups Controller
 * handles every groups related task and authentication
 */

// importing services
import models from '../models';
import paginate from '../utils/paginate';

let userID = 0;
export const groups = {
  /**
   * createGroup - create a group
   * 
   * @param {object} req
   * @param {object} res
   * 
   * @return {object} user
   */
  createGroup(req, res) {
    const userName = req.authToken.data.username;
    if (!req.body.name || req.body.name.trim() === '') {
      return res.status(400)
        .send({ message: 'Name parameter is required' });
    }
    if (!req.body.desc || req.body.desc.trim() === '') {
      return res.status(400)
        .send({ message: 'Desc parameter is required' });
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
   * viewUserGroups - view all groups of a user
   * 
   * @param {object} req 
   * @param {object} res 
   * 
   * @return {object} groups
   */
  viewUserGroups(req, res) {
    const limitValue = req.query.limit || 5;
    const pageValue = (req.query.page - 1) || 0;
    const userId = req.authToken.data.id;
    return models.Groups
      .findAndCountAll({
        limit: limitValue,
        offset: pageValue * limitValue,
        include: [{
          model: models.Users,
          where: { id: userId },
          attributes: { exclude: ['password'] },
          through: {
            attributes: ['id', 'username'],
          },
          as: 'users'
        }]
      })
      .then((allGroups) => {
        const size = allGroups.rows.length;
        return res.status(200).send({
          pagination: paginate(allGroups.count, limitValue, pageValue, size),
          allGroups: allGroups.rows
        });
      })
      .catch(error => res.status(404).send(error));
  }
};
