using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Timelogger.Api.Models
{
    public class TimesheetsRepository
    {
        private readonly IMemoryCache memoryCache;

        public TimesheetsRepository(IMemoryCache memoryCache)
        { 
            this.memoryCache = memoryCache;
        }

        public async Task BuildTimesheetList()
        {
            var cacheKey = "GetTimesheetsList";
            if (!memoryCache.TryGetValue(cacheKey, out List<TimesheetModel> timesheetList))
            {
                timesheetList = await Task.Run(() =>
                {
                    return new List<TimesheetModel>()
                    {
                        new TimesheetModel { Id = 1, Name = "Microsoft", DeadLine = "06/10/2022", LoggedHours = 10 },
                        new TimesheetModel { Id = 2, Name = "Oracle", DeadLine = "07/18/2022", LoggedHours = 20 },
                        new TimesheetModel { Id = 3, Name = "AWS", DeadLine = "08/18/2022", LoggedHours = 30 },
                        new TimesheetModel { Id = 4, Name = "Personal project", DeadLine = "09/18/2022", LoggedHours = 40 },
                    };
                });
                var cacheExpiryOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddMinutes(5),
                    Priority = CacheItemPriority.High,
                    SlidingExpiration = TimeSpan.FromMinutes(2)
                };
                memoryCache.Set(cacheKey, timesheetList, cacheExpiryOptions);
            }
        }

        public async Task<List<TimesheetModel>> GetTimesheetsAsync()
        {
            var _timesheetList = new List<TimesheetModel>();
            var cacheKey = "GetTimesheetsList";

            await BuildTimesheetList();

            if (memoryCache.TryGetValue(cacheKey, out List<TimesheetModel> timesheetList))
            {
                _timesheetList.AddRange(timesheetList);
            }

            return _timesheetList;
        }

        public async Task AddProject(ProjectTimesheetModel project)
        {
            var cacheKey = "GetTimesheetsList";

            await BuildTimesheetList();

            if (memoryCache.TryGetValue(cacheKey, out List<TimesheetModel> timesheetList))
            {
                timesheetList.Add(new TimesheetModel { Id = timesheetList.Count + 1, Name = project.Name, DeadLine = project.DeadLine, LoggedHours = (project.LoggedHours/60) });
                var cacheExpiryOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddMinutes(5),
                    Priority = CacheItemPriority.High,
                    SlidingExpiration = TimeSpan.FromMinutes(2)
                };
                memoryCache.Set(cacheKey, timesheetList, cacheExpiryOptions);
            }

        }

        public async Task LogHours(LogTimesheetModel project)
        {
            var cacheKey = "GetTimesheetsList";

            await BuildTimesheetList();
            
            if (memoryCache.TryGetValue(cacheKey, out List<TimesheetModel> timesheetList))
            {
                foreach (var timesheet in timesheetList) 
                {
                    if (timesheet.Id == project.Id) 
                    {
                        timesheet.LoggedHours += (project.LoggedHours/60);
                    }
                }
                var cacheExpiryOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpiration = DateTime.Now.AddMinutes(5),
                    Priority = CacheItemPriority.High,
                    SlidingExpiration = TimeSpan.FromMinutes(2)
                };
                memoryCache.Set(cacheKey, timesheetList, cacheExpiryOptions);
            }
        }
    }
}
