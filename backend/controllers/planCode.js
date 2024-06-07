// controllers/codeLessonExamController.js
const { Op } = require('sequelize');

const CodeLessonExam = require('../models/planCode');

exports.codeLessonExamController = {
  /*async getAllCodeLessonExams(req, res) {
    try {
      const codeLessonExams = await CodeLessonExam.findAll();
      res.json(codeLessonExams);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },*/
  async getAllLessons(req, res) {
    try {
      const lessons = await CodeLessonExam.findAll({
        where: {
          taskType: 'lesson'
        }
      });
      res.json(lessons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllExams(req, res) {
    try {
      const exams = await CodeLessonExam.findAll({
        where: {
          taskType: 'exam'
        }
      });
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  /*async createCodeLessonExam(req, res) {
    try {
      const codeLessonExamData = req.body;
      const codeLessonExam = await CodeLessonExam.create(codeLessonExamData);
      res.status(201).json(codeLessonExam);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  },*/
  async createCodeLessonExam(req, res) {
    try {
      const { date, startHour, endHour, candidatCIN, taskType } = req.body;
  
      // Check for conflicts
      const conflict = await CodeLessonExam.findOne({
        where: {
          date: date,
          candidatCIN: candidatCIN,
          [Op.or]: [
            {
              startHour: {
                [Op.between]: [startHour, endHour]
              }
            },
            {
              endHour: {
                [Op.between]: [startHour, endHour]
              }
            },
            {
              [Op.and]: [
                {
                  startHour: {
                    [Op.lte]: startHour
                  }
                },
                {
                  endHour: {
                    [Op.gte]: endHour
                  }
                }
              ]
            }
          ]
        }
      });
  
      if (conflict) {
        return res.status(400).json({ error: 'There is already a lesson or exam scheduled for this candidate at the given time.' });
      }
  
      // No conflict, create the lesson or exam
      const codeLessonExam = await CodeLessonExam.create(req.body);
      res.status(201).json(codeLessonExam);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  

  async deleteCodeLessonExam(req, res) {
    try {
      const codeLessonExamId = req.params.id;
      await CodeLessonExam.destroy({where: {id: codeLessonExamId}});
      res.json({message: 'Code Lesson Exam deleted successfully'});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },

  /*async updateCodeLessonExam(req, res) {
    try {
      const codeLessonExamId = req.params.id;
      const updatedData = req.body;

      const codeLessonExam = await CodeLessonExam.findByPk(codeLessonExamId);
      if (!codeLessonExam) {
        return res.status(404).json({error: 'Lesson or Exam not found'});
      }

      await codeLessonExam.update(updatedData);
      res.json(codeLessonExam);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }*/
  async updateCodeLessonExam(req, res) {
    try {
      const codeLessonExamId = req.params.id;
      const updatedData = req.body;
      const { date, startHour, endHour, candidatCIN } = updatedData;
  
      const codeLessonExam = await CodeLessonExam.findByPk(codeLessonExamId);
      if (!codeLessonExam) {
        return res.status(404).json({ error: 'Lesson or Exam not found' });
      }
  
      // Check for conflicts
      const conflict = await CodeLessonExam.findOne({
        where: {
          date: date,
          candidatCIN: candidatCIN,
          id: { [Op.ne]: codeLessonExamId }, // Exclude the current entry
          [Op.or]: [
            {
              startHour: {
                [Op.between]: [startHour, endHour] // Start time is between new start and end time
              }
            },
            {
              endHour: {
                [Op.between]: [startHour, endHour] // End time is between new start and end time
              }
            },
            {
              [Op.and]: [
                {
                  startHour: {
                    [Op.lte]: startHour // Existing start time is before or at the new start time
                  }
                },
                {
                  endHour: {
                    [Op.gte]: endHour // Existing end time is after or at the new end time
                  }
                }
              ]
            }
          ]
        }
      });
  
      if (conflict) {
        return res.status(400).json({ error: 'There is already a lesson or exam scheduled for this candidate at the given time.' });
      }
  
      await codeLessonExam.update(updatedData);
      res.json(codeLessonExam);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
