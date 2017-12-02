import { List } from 'immutable';

export default (agenda, myAgenda) => {
  const AGENDA = List(agenda);
  const MY_AGENDA = List(myAgenda);

  let result = List();

  AGENDA.forEach(item => {
    let schedule = item;
    MY_AGENDA.forEach(myAgendaItem => {
      if (myAgendaItem.schedule_id === schedule.id) {
        schedule = {
          ...schedule,
          personalScheduleId: myAgendaItem.id,
          existed: true,
        };
      }
    });
    result = result.push(schedule);
  });
  return result.toJS();
};
