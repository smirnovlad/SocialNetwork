# Generated by Django 4.2.5 on 2023-11-20 11:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='login',
            field=models.CharField(max_length=15, unique=True),
        ),
    ]
