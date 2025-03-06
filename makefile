# Nama file: Makefile

# Default target (opsional, agar 'make' tanpa argumen menjalankan up)
.DEFAULT_GOAL := up

# Jalankan docker-compose up dengan --build dan recreate jika sudah ada
jalan:
	@echo "🔄 Starting or recreating containers..."
	@docker-compose up -d --build --force-recreate

# Stop dan hapus container serta network yang terkait
berhenti:
	@echo "🛑 Stopping and removing containers..."
	@docker-compose down

# Pause container tanpa menghapusnya
pause:
	@echo "⏸️  Pausing all containers..."
	@docker-compose pause

# Unpause container yang sebelumnya dipause
unpause:
	@echo "▶️  Unpausing all containers..."
	@docker-compose unpause

nyoba:
	@echo "halo"