using Architecture.ViewModel;
using Microsoft.EntityFrameworkCore;

// Define the namespace for the CourseRepository class
namespace Architecture.Models
{
    // This class implements the ICourseRepository interface
    public class CourseRepository : ICourseRepository
    {
        // The AppDbContext instance used to interact with the database
        private readonly AppDbContext _appDbContext;

        // Constructor receives an AppDbContext instance and assigns it to the private field
        public CourseRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // This method retrieves all courses from the database
        public async Task<Course[]> GetAllCourseAsync()
        {
            IQueryable<Course> query = _appDbContext.Courses;
            return await query.ToArrayAsync();
        }

        // This method retrieves a single course by courseId from the database
        public async Task<Course> GetCourseAsync(int courseId)
        {
            IQueryable<Course> query = _appDbContext.Courses.Where(c => c.CourseId == courseId);
            return await query.FirstOrDefaultAsync();
        }

        // This method saves the changes made to the DbContext to the database
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        // This method adds a new course to the database
        public async Task<int> AddCourseAsync(CourseViewModel courseVm)
        {
            const int successCode = 200;
            const int errorCode = 500;

            try
            {
                // Create a new Course instance and populate it with data from the ViewModel
                Course newCourse = new Course
                {
                    Name = courseVm.Name,
                    Description = courseVm.Description,
                    Duration = courseVm.Duration
                };

                // Add the new course to the database and save changes
                await _appDbContext.Courses.AddAsync(newCourse);
                await _appDbContext.SaveChangesAsync();

                // Return success code if everything went well
                return successCode;
            }
            catch (Exception)
            {
                // Return error code if an exception occurred
                return errorCode;
            }
        }

        // This method deletes a course by id from the database
        public async Task<Course> DeleteCourseAsync(int id)
        {
            var course = await _appDbContext.Courses.FirstOrDefaultAsync(c => c.CourseId == id);
            if (course != null)
            {
                _appDbContext.Courses.Remove(course);
                await _appDbContext.SaveChangesAsync();
            }
            return course;
        }

        // This method updates a course in the database
        public async Task<Course> UpdateCourseAsync(int id, CourseViewModel updatedCourse)
        {
            var course = await _appDbContext.Courses.FirstOrDefaultAsync(c => c.CourseId == id);

            // If the course exists, update its properties
            if (course != null)
            {
                course.Name = updatedCourse.Name;
                course.Description = updatedCourse.Description;
                course.Duration = updatedCourse.Duration;

                // Update the course in the database and save changes
                _appDbContext.Courses.Update(course);
                await _appDbContext.SaveChangesAsync();
            }

            // Return the updated course
            return course;
        }
    }
}
