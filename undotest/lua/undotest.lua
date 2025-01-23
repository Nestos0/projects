M = {}
--- Print a formatted view of the undo tree
function M.echotree()
	local buf = vim.api.nvim_get_current_buf()
	local undolist = vim.fn.undotree(buf)
	local savelist = {}

	for _, i in ipairs(undolist.entries) do
		if i.save then
			savelist[i.save] = i.seq
		end
		if i.seq == undolist.seq_cur then
			print(string.format("*  [%d]  Current", i.seq))
		else
			print(string.format("*  [%d]", i.seq))
		end
	end
	-- Print basic info
	print(string.format("Undo Tree for buffer %d", undolist.seq_cur))
	print(string.format("  Entries: %d", undolist.seq_last))
	print(string.format("  Save number: %d", undolist.save_cur))
	for k, v in pairs(savelist) do
		print(string.format("Save Time %d: %d", k, v))
	end
end

function M.create_floating_win()
	local win = vim.api.nvim_get_current_win()
	local width = vim.api.nvim_win_get_width(win)
	local height = vim.api.nvim_win_get_height(win)
	local buf = vim.api.nvim_create_buf(false, true)
	local opts = {
		relative = "win",
		col = math.ceil(width / 2) - math.ceil(width * 0.6 / 2), -- Simplified calculation
		row = math.ceil(height / 2) - math.ceil(height * 0.6 / 2), -- Simplified calculation
		width = math.ceil(width * 0.6),
		height = math.ceil(height * 0.6),
		style = "minimal",
		border = "rounded",
		title = "Undo Tree",
		title_pos = "center",
	}
	local win_id = vim.api.nvim_open_win(buf, true, opts)
	vim.api.nvim_win_set_option(win_id, "winhl", "Normal:FloatBorder")
	return win_id
end

function M.setup()
	vim.api.nvim_create_user_command("Echotree", function()
		M.echotree()
	end, {})
end

return M
