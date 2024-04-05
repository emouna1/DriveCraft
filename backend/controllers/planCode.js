// controllers/codeLessonExamController.js
const CodeLessonExam = require('../models/planCode');

exports.codeLessonExamController = {
  async getAllCodeLessonExams(req, res) {
    try {
      const codeLessonExams = await CodeLessonExam.findAll();
      res.json(codeLessonExams);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  },

  async createCodeLessonExam(req, res) {
    try {
      const codeLessonExamData = req.body;
      const codeLessonExam = await CodeLessonExam.create(codeLessonExamData);
      res.status(201).json(codeLessonExam);
    } catch (error) {
      res.status(400).json({error: error.message});
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

  async updateCodeLessonExam(req, res) {
    try {
      const codeLessonExamId = req.params.id;
      const updatedData = req.body;

      const codeLessonExam = await CodeLessonExam.findByPk(codeLessonExamId);
      if (!codeLessonExam) {
        return res.status(404).json({error: 'Code Lesson Exam not found'});
      }

      await codeLessonExam.update(updatedData);
      res.json(codeLessonExam);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }
};
