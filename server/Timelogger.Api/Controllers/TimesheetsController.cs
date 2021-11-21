using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Timelogger.Api.Models;

namespace Timelogger.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimesheetsController : ControllerBase
    {
        private readonly TimesheetsRepository timesheetsRepository;

        public TimesheetsController(IMemoryCache memoryCache)
        {
            
            this.timesheetsRepository = new TimesheetsRepository(memoryCache);
        }

        [HttpGet("GetTimesheets")]
        public async Task<List<TimesheetModel>> GetTimesheets()
        {
            return await timesheetsRepository.GetTimesheetsAsync();
        }

        [HttpPost("AddProject")]
        public async Task<bool> AddProject([FromBody] ProjectTimesheetModel project)
        {
            try
            {
                await timesheetsRepository.AddProject(project);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        [HttpPut("LogHours")]
        public async Task<bool> LogHours([FromBody] LogTimesheetModel project)
        {
            try
            {
                await timesheetsRepository.LogHours(project);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

    }
}
