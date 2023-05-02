using Architecture.ViewModel;

namespace Architecture.Models
{
    // Define the ICourseRepository interface for managing Course entities
    public interface ICourseRepository
    {
        // This method retrieves all courses from the database
        Task<Course[]> GetAllCourseAsync();

        // This method saves the changes made to the DbContext to the database
        Task<bool> SaveChangesAsync();

        // This method retrieves a single course by courseId from the database
        Task<Course> GetCourseAsync(int courseId);

        // This method adds a new course to the database using a CourseViewModel
        Task<int> AddCourseAsync(CourseViewModel course);

        // This method deletes a course by id from the database
        Task<Course> DeleteCourseAsync(int id);

        // This method updates a course in the database using a CourseViewModel
        Task<Course> UpdateCourseAsync(int id, CourseViewModel updatedCourse);
    }
}
