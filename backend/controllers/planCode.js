// controllers/codeLessonExamController.js
const { Op } = require('sequelize');

const CodeLessonExam = require('../models/planCode');
const User = require('../models/user')
const InstructorCandidateRelation = require('../models/InstructorStudent');



exports.codeLessonExamController = {
  
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
  /*async createCodeLessonExam(req, res) {
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
  */

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
  /*async updateCodeLessonExam(req, res) {
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
  }*/




























    async createCodeLessonExam(req, res) {
      try {
        const { date, startHour, endHour, candidatCIN, taskType, taskCategory, accomplished } = req.body;
    
        // Check for conflicts for the candidate
        const candidate = await User.findOne({
          where: { CIN : candidatCIN }

        })
        console.log('the candidate is', candidate)
        console.log('the candidate id is', candidate.id)


        const existingAssignment = await InstructorCandidateRelation.findOne({
          where: { studentId : candidate.id }
        });
          
        console.log('the existing assignment is ', existingAssignment)

        const candidateConflict = await CodeLessonExam.findOne({
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
    
        if (candidateConflict) {
          return res.status(400).json({ error: 'Candidate has a scheduling conflict.' });
        }
        console.log("instructor Id is", existingAssignment.instructorId );
        console.log("vehicle Id is", existingAssignment.carId );
        // Check for conflicts for the instructor and their vehicle
        const instructorConflict = await CodeLessonExam.findOne({
          where: {
            date: date,
            instructorId: existingAssignment.instructorId,
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
    
        if (instructorConflict) {
          return res.status(400).json({ error: 'Instructor has a scheduling conflict.' });
        }
        const vehicleConflict = await CodeLessonExam.findOne({
          where: {
            date: date,
            vehicleId: existingAssignment.carId,
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
    
        if (vehicleConflict) {
          return res.status(400).json({ error: ' vehicle has a scheduling conflict.' });
        }
    
        // No conflicts, create the lesson or exam
        const codeLessonExam = await CodeLessonExam.create({
          date,
          startHour,
          endHour,
          candidatCIN,
          taskType,
          taskCategory,
          accomplished,
          instructorId : existingAssignment.instructorId,
          vehicleId : existingAssignment.carId, // Ensure the same vehicle is checked 
          
      });
        res.status(201).json(codeLessonExam);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
    

async updateCodeLessonExam(req, res) {
  try {
    const codeLessonExamId = req.params.id;
    const updatedData = req.body;
    const { date, startHour, endHour, candidatCIN, taskType, taskCategory, accomplished } = req.body;


    const codeLessonExam = await CodeLessonExam.findByPk(codeLessonExamId);
    if (!codeLessonExam) {
      return res.status(404).json({ error: 'Lesson or Exam not found' });
    }
     
    const existingAssignment = await InstructorCandidateRelation.findOne({
      where: { studentId : candidate.id }
    });
      
    console.log('the existing assignment is ', existingAssignment)

    // Check for conflicts for the candidate
    const candidateConflict = await CodeLessonExam.findOne({
      where: {
        date: date,
        candidatCIN: candidatCIN,
        id: { [Op.ne]: codeLessonExamId }, // Exclude the current entry
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

    if (candidateConflict) {
      return res.status(400).json({ error: 'Candidate has a scheduling conflict.' });
    }

    // Check for conflicts for the instructor and their vehicle
    const vehicleConflict = await CodeLessonExam.findOne({
      where: {
        date: date,
      
        vehicleId: existingAssignment.carId, // Ensure the same vehicle is checked
        id: { [Op.ne]: codeLessonExamId }, // Exclude the current entry
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

    if (instructorConflict) {
      return res.status(400).json({ error: ' vehicle has a scheduling conflict.' });
    }
    const instructorConflict = await CodeLessonExam.findOne({
      where: {
        date: date,
        instructorId: existingAssignment.instructorId,
        id: { [Op.ne]: codeLessonExamId }, // Exclude the current entry
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

    if (vehicleConflict) {
      return res.status(400).json({ error: 'Instructor  has a scheduling conflict.' });
    }
    // No conflicts, update the lesson or exam
    await codeLessonExam.update(updatedData);
    res.json(codeLessonExam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
};