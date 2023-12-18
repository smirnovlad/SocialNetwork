# Generated by Django 4.2.5 on 2023-11-24 12:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0003_alter_message_timestamp'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='message',
            new_name='text',
        ),
        migrations.AlterField(
            model_name='friends',
            name='firstUser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friends_first_user', to='messenger.user'),
        ),
        migrations.AlterField(
            model_name='friends',
            name='secondUser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friends_second_user', to='messenger.user'),
        ),
        migrations.AlterField(
            model_name='message',
            name='receiver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message_receiver', to='messenger.user'),
        ),
        migrations.AlterField(
            model_name='message',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message_sender', to='messenger.user'),
        ),
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chat_first_user', to='messenger.user')),
                ('secondUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chat_second_user', to='messenger.user')),
            ],
        ),
        migrations.AddField(
            model_name='message',
            name='chat',
            field=models.ForeignKey(default=-1, on_delete=django.db.models.deletion.CASCADE, related_name='message_chat', to='messenger.chat'),
            preserve_default=False,
        ),
    ]