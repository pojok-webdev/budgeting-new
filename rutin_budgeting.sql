select a.id,b.id bid from submissions a left outer join submission_details b on b.submission_id=a.id where budgeting_number="202404/BUD/00291";
+------+------+
| id   | bid  |
+------+------+
| 2394 | 2112 |
+------+------+
1 row in set (0.00 sec)

mysql> insert into deletedsubmission_details select * from submission_details where id=2112;
Query OK, 1 row affected (0.07 sec)
Records: 1  Duplicates: 0  Warnings: 0

mysql> delete from submission_details where id=2112;
Query OK, 1 row affected (0.04 sec)

mysql> insert into deletedsubmissions select * from submissions where id=2394;
Query OK, 1 row affected (0.03 sec)
Records: 1  Duplicates: 0  Warnings: 0

mysql> delete from submissions where id=2394;
Query OK, 1 row affected (0.03 sec)



select a.id,b.id bid from submissions a left outer join submission_details b on b.submission_id=a.id where budgeting_number="202404/BUD/00290";
+------+------+
| id   | bid  |
+------+------+
| 2394 | 2112 |
+------+------+
1 row in set (0.00 sec)

mysql> insert into deletedsubmission_details select * from submission_details where id=2111;
Query OK, 1 row affected (0.07 sec)
Records: 1  Duplicates: 0  Warnings: 0

mysql> delete from submission_details where id=2112;
Query OK, 1 row affected (0.04 sec)

mysql> insert into deletedsubmissions select * from submissions where id=2393;
Query OK, 1 row affected (0.03 sec)
Records: 1  Duplicates: 0  Warnings: 0

mysql> delete from submissions where id=2394;
Query OK, 1 row affected (0.03 sec)

