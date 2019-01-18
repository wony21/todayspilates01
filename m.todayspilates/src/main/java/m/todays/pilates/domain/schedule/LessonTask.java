package m.todays.pilates.domain.schedule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import m.todays.pilates.domain.reservation.member.MemberResrvService;

@Service
public class LessonTask {
	
	@Autowired
	private MemberResrvService memberResrvService;

	// 매일 0시 0분 0초에 실행
	@Scheduled(cron = "*/10 0 0 * * *")
	public void lessonSchedule() {
		System.out.println("Schedule Start ------------------------------------------------");
		memberResrvService.updateEndLesson();
		System.out.println("Schedule End ------------------------------------------------");
	}
}
