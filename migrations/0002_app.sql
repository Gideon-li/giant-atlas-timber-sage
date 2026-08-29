-- App tables for 奇门权衡: profiles, prediction feedback, weather model runs

create table if not exists app_profiles (
  user_id    text primary key,
  role       text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists prediction_feedback (
  id              serial primary key,
  user_id         text not null,
  created_at      timestamptz not null default now(),
  civil_time      text not null,
  ju_label        text not null,
  event_id        text not null,
  event_name      text not null,
  predicted_score integer not null,
  predicted_level text not null,
  predicted_prob  integer not null,
  accuracy        text not null,
  realized_luck   text not null,
  happened        text not null,
  note            text not null default '',
  province        text not null default '',
  city            text not null default '',
  district        text not null default '',
  casting         text not null default 'chaibu',
  chart_snapshot  text not null default '{}'
);
create index if not exists prediction_feedback_user_idx on prediction_feedback (user_id);
create index if not exists prediction_feedback_created_idx on prediction_feedback (created_at desc);

create table if not exists weather_model_runs (
  id              serial primary key,
  user_id         text not null,
  created_at      timestamptz not null default now(),
  n_days          integer not null,
  train_end       text not null,
  test_start      text not null,
  daily_acc       real not null,
  xun_acc         real not null,
  daily_acc_test  real not null,
  xun_acc_test    real not null,
  epochs          integer not null,
  notes           text not null default '',
  weights_json    text not null
);
