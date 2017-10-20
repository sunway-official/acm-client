import { List } from 'immutable';

export default (agenda, myAgenda, key) => {
  const KEY = key;

  const AGENDA = List(agenda);
  const MY_AGENDA = List(myAgenda);

  let result = List();

  AGENDA.forEach(item => {
    let schedule = item;
    MY_AGENDA.forEach(myAgendaItem => {
      if (myAgendaItem.schedule.id === schedule.id) {
        schedule = {
          ...schedule,
          [KEY]: true,
        };
      }
    });
    result = result.push(schedule);
  });
  return result.toJS();
};
