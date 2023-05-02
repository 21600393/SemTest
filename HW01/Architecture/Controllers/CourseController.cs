using Architecture.Models;
using Architecture.ViewModel;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace Architecture.Controllers
{
    // Define the route and controller attributes
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        // Declare a private readonly variable for the ICourseRepository
        private readonly ICourseRepository _courseRepository;

        // Constructor: initializes the ICourseRepository dependency
        // This allows the controller to interact with the data repository
        public CourseController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        // GetAllCourses endpoint: returns a list of all courses
        // HttpMethod: GET
        // Route: api/Course/GetAllCourses
        [HttpGet]
        [Route("GetAllCourses")]
        public async Task<IActionResult> GetAllCourses()
        {
            try
            {
                // Fetch all courses from the data repository
                var results = await _courseRepository.GetAllCourseAsync();

                // Return the list of courses as an HTTP 200 OK response
                return Ok(results);
            }
            catch (Exception)
            {
                // In case of an exception, return an HTTP 500 Internal Server Error response
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        // AddCourse endpoint: adds a new course to the data repository
        // HttpMethod: POST
        // Route: api/Course/AddCourse
        [HttpPost]
        [Route("AddCourse")]
        public async Task<IActionResult> AddCourse([FromBody] CourseViewModel courseVm)
        {
            // Check if the received data is valid according to the model
            if (!ModelState.IsValid)
            {
                // If the data is invalid, return an HTTP 400 Bad Request response
                return BadRequest(ModelState);
            }

            // Add the course to the data repository and get the status code
            int statusCode = await _courseRepository.AddCourseAsync(courseVm);

            // Check if the status code indicates success (HTTP 200 OK)
            if (statusCode == 200)
            {
                // Return a success message with the status code
                return Ok(new { Message = "Course added successfully", StatusCode = statusCode });
            }
            else
            {
                // If the status code indicates an error, return an HTTP error response with a message
                return StatusCode(statusCode, new { Message = "An error occurred while adding the course", StatusCode = statusCode });
            }
        }

        // GetCourseAsync endpoint: returns a course by its ID
        // HttpMethod: GET
        // Route: api/Course/GetCourse/{courseId}
        [HttpGet]
        [Route("GetCourse/{courseId}")]
        public async Task<IActionResult> GetCourseAsync(int courseId)
        {
            try
            {
                // Fetch the course by its ID from the data repository
                var result = await _courseRepository.GetCourseAsync(courseId);

                // Check if the course exists
                if (result == null) return NotFound("Course does not exist");

                // If the course exists, return it as an HTTP 200 OK response
                return Ok(result);
            }
            catch (Exception)
            {
                // In case of an exception, return an HTTP 500 Internal Server Error response
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        // DeleteCourse endpoint: deletes a course by its ID
        // HttpMethod: DELETE
        // Route: api/Course/DeleteCourse/{id}
        [HttpDelete("DeleteCourse/{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            // Attempt to delete the course with the given ID from the data repository
            var result = await _courseRepository.DeleteCourseAsync(id);

            // Check if the course was found and deleted
            if (result == null)
            {
                // If the course was not found, return an HTTP 404 Not Found response
                return NotFound("Course not found");
            }

            // If the course was found and deleted, return an HTTP 200 OK response with a success message
            return Ok(new { message = "Course deleted successfully", statusCode = 200 });
        }

        // UpdateCourse endpoint: updates a course by its ID with the new course data
        // HttpMethod: PUT
        // Route: api/Course/UpdateCourse/{id}
        [HttpPut("UpdateCourse/{id}")]
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] CourseViewModel updatedCourse)
        {
            // Attempt to update the course with the given ID in the data repository with the new course data
            var result = await _courseRepository.UpdateCourseAsync(id, updatedCourse);

            // Check if the course was found and updated
            if (result == null)
            {
                // If the course was not found, return an HTTP 404 Not Found response
                return NotFound("Course not found");
            }

            // If the course was found and updated, return an HTTP 200 OK response with a success message
            return Ok(new { message = "Course updated successfully", statusCode = 200 });
        }
    }
}