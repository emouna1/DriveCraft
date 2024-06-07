// controllers/instructorController.js

const InstructorCandidatRelation = require('../models/InstructorStudent');
const User = require('../models/user');
const CodeLessonExam = require('../models/planCode')
const Vehicle=require('../models/Vehicle')
/*exports.getInstructorForCandidate = async (req, res) => {
    try {
        const candidateId = req.params.candidateId;

        // Find the instructor associated with the candidate
        const instructorRelation = await InstructorCandidatRelation.findOne({
            where: { studentId: candidateId },
            include: [{
                model: User,
                as: 'instructor'}],// Specify the alias of the association
                include: [{
                    model: Vehicle, // Include the Vehicle model
                    as: 'car' // Specify the alias of the association
                }]
            
        });

        if (!instructorRelation) {
            return res.status(404).send('Instructor not found for the candidate');
        }

        // Send the instructor details as response
        res.json(instructorRelation);
    } catch (error) {
        console.error('Error fetching instructor details:', error);
        res.status(500).send('Internal server error');
    }
};
*/
exports.getInstructorForCandidate = async (req, res) => {
  try {
      const candidateId = req.params.candidateId;

      // Find the instructor-candidate relation for the candidate
      const instructorRelation = await InstructorCandidatRelation.findOne({
          where: { studentId: candidateId },
          include: [{
              model: User,
              as: 'instructor'
          }, {
              model: Vehicle,
              as: 'car'
          }]
      });

      if (!instructorRelation) {
          return res.status(404).send('Instructor details not found for the candidate');
      }

      const instructorId = instructorRelation.instructor.id;

      // Find the instructor details based on the retrieved instructorId
      const instructor = await User.findByPk(instructorId);

      if (!instructor) {
          return res.status(404).send('Instructor not found');
      }

      // Send the instructor and vehicle details as response
      res.json({
          instructor: instructor,
          vehicle: instructorRelation.car
      });
  } catch (error) {
      console.error('Error fetching instructor details:', error);
      res.status(500).send('Internal server error');
  }
};

/*exports.getInstructorForCandidate = async (req, res) => {
    try {
      const candidateId = req.params.candidateId;
  
      // Find the instructor associated with the candidate
      const instructorRelation = await InstructorCandidatRelation.findOne({
        where: { studentId: candidateId }
      });
  
      if (!instructorRelation) {
        return res.status(404).send('Instructor not found for the candidate');
      }
  
      // Get the details of the instructor
      const id = instructorRelation.instructorId;
      const instructor = await User.findByPk(id);
  
      if (!instructor) {
        return res.status(404).send('Instructor details not found');
      }
  
      // Additional instructor details from the User table
      // For example, you can access instructor.firstName, instructor.lastName, etc.
  
      // Send the instructor details as response
      res.json(instructor);
    } catch (error) {
      console.error('Error fetching instructor details:', error);
      res.status(500).send('Internal server error');
    }
  };
  */
  exports.getCandidatesForInstructor = async (req, res) => {
    try {
      const instructorId = req.params.instructorId;
  
      // Find all candidates associated with the instructor
      const candidates = await InstructorCandidatRelation.findAll({
        where: { instructorId: instructorId },
        include: [{ 
          model: User,
          as: 'student' // Specify the alias of the association
        }]
      });
  
      if (candidates.length === 0) {
        return res.status(404).send('Candidates not found for the instructor');
      }
  
      // Send the candidates list as response
      res.json(candidates);
    } catch (error) {
      console.error('Error fetching candidates for instructor:', error);
      res.status(500).send('Internal server error');
    }
};


exports.getLessonsForInstructor = async (req, res) => {
  try {
      const instructorId = req.params.instructorId;
      
      console.log('Instructor ID:', instructorId);

      // Find all students associated with the instructor
      const students = await InstructorCandidatRelation.findAll({
          where: { instructorId: instructorId },
          attributes: ['studentId'] // Get only student IDs
      });
      console.log('Students:', students);

      // Extract student IDs from the result
      const studentIDs = students.map(student => student.studentId);

      // Find all student IDs based on their CIN
      const studentCINs = await User.findAll({
          where: { id: studentIDs },
          attributes: ['CIN'] // Get only user CINs
      });

      // Extract CINs from the result
      const studentCINsArray = studentCINs.map(student => student.CIN);

      // Find all lessons associated with the retrieved student CINs
      const lessons = await CodeLessonExam.findAll({
          where: { candidatCIN: studentCINsArray,
                   taskType: 'lesson' }
      });


      // Send the lessons list as response
      res.json(lessons);
  } catch (error) {
      console.error('Error fetching lessons for instructor:', error);  
      res.status(500).send('Internal server error');
  }
};

exports.getExamsForInstructor = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;
    
    console.log('Instructor ID:', instructorId);

    // Find all students associated with the instructor
    const students = await InstructorCandidatRelation.findAll({
        where: { instructorId: instructorId },
        attributes: ['studentId'] // Get only student IDs
    });
    console.log('Students:', students);

    // Extract student IDs from the result
    const studentIDs = students.map(student => student.studentId);

    // Find all student IDs based on their CIN
    const studentCINs = await User.findAll({
        where: { id: studentIDs },
        attributes: ['CIN'] // Get only user CINs
    });

    // Extract CINs from the result
    const studentCINsArray = studentCINs.map(student => student.CIN);

    // Find all lessons associated with the retrieved student CINs
    const lessons = await CodeLessonExam.findAll({
        where: { candidatCIN: studentCINsArray,
                 taskType: 'exam' }
    });


    // Send the lessons list as response
    res.json(lessons);
} catch (error) {
    console.error('Error fetching lessons for instructor:', error);  
    res.status(500).send('Internal server error');
}
};