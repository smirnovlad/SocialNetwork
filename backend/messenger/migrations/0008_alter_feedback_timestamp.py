# Generated by Django 4.2.5 on 2023-11-26 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0007_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
